"use client";

import {useCallback, useRef, useState} from "react";
import {useLoginCode} from "@/lib/hooks";
import Loading from "@/components/Loading";

import "@/styles/Home.scss";
import QuickPinchZoom, {make3dTransformValue} from "react-quick-pinch-zoom";

export default function Home() {
    const [code] = useLoginCode()

    const [image, setImage] = useState()
    const [question, setQuestion] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const imgRef = useRef();

    // @ts-ignore typescript 2 : the two ts-ignores
    const onUpdate = useCallback(({ x, y, scale }) => {
        // @ts-ignore typescript 3: the return of the ts-ignore
        if (imgRef.current) imgRef.current.style.setProperty(
            "transform",
            make3dTransformValue({ x, y, scale })
        )
    }, [])


    const prev = () => setCurrentPage(prevPage => prevPage - 1)
    const next = () => setCurrentPage(prevPage => prevPage + 1)

    function fetchQuestion() {
        if (!question && code) {
            fetch(`/api/current_question?code=${code}`)
                .then(res => res.json())
                .then(json => setQuestion(json))
        }
    }

    function submit() {
        fetch("/api/submit", {
            method: "POST",
            // @ts-ignore prepare for trouble
            body: JSON.stringify({code: code, base64: image})
        })
            .then(res => res.json())
            .then(json => {
                setQuestion(json)
                setCurrentPage(1)

                // @ts-ignore and make it double
                setImage(null)
            })
    }

    fetchQuestion()

    if (!question || !code) return <Loading/>

    // @ts-ignore AAAAAAAAAA
    if (question.gameOver) {
        return <>
            <h1>Congrats! You finished!</h1>

            <p>Your ranking and the pictures you took will be revealed on Thursday.</p>
        </>
    }

    switch (currentPage) {
        case 1:
            return <div>
                {
                    // @ts-ignore SHUT
                    <h1>New objective: Travel to the {question.place}.</h1>
                }
                {
                    // @ts-ignore THE
                    question.info && <div>
                        <h2>Did you know?</h2>
                        {
                            // @ts-ignore FUCK
                            <p>{question.info}</p>
                        }
                    </div>
                }
                <button onClick={next}>We're here</button>
            </div>

        case 2:
            return <div className="content">
                <h1>
                    Task: {
                        // @ts-ignore UP
                        question.task
                    }
                </h1>

                <div>
                    <QuickPinchZoom onUpdate={onUpdate}>
                        {
                            <img
                                // @ts-ignore ...
                                ref={imgRef}
                                alt="Sample image"
                                // @ts-ignore SHUT UP
                                src={question.image}
                            />
                        }
                    </QuickPinchZoom>
                </div>

                    <button onClick={prev}>Back to information</button>
                    <button onClick={next}>Continue</button>
                </div>

        case 3:
            return <div className="content">
                {image && (
                    <div>
                        <QuickPinchZoom onUpdate={onUpdate}>
                            {
                                <img
                                    // @ts-ignore
                                    ref={imgRef}
                                    alt="Couldn't upload image; select another"
                                    src={image}
                                />
                            }
                        </QuickPinchZoom>

                        <br/>

                        {
                            // @ts-ignore shut
                            <button onClick={() => setImage(null)}>Remove</button>
                        }
                        <button onClick={submit}>Submit</button>
                    </div>
                )}

                <br/>
                <br/>

                <input
                    type="file"
                    accept="image/*"
                    onChange={event => {
                        const reader = new FileReader()
                        // @ts-ignore this will totally break
                        const objectURL = URL.createObjectURL(event.target.files[0])

                        fetch(objectURL)
                            .then(r => r.blob())
                            .then(r => reader.readAsDataURL(r))

                        reader.onload = () => {
                            // @ts-ignore we'll see
                            setImage(reader.result)
                            URL.revokeObjectURL(objectURL)
                        }
                    }}
                />

                <button onClick={prev}>Back to task</button>
            </div>
    }
}
