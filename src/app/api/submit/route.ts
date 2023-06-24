import {NextRequest, NextResponse} from "next/server";
import {auth, client} from "@/lib/pocketbase";
import {is_authorized} from "@/lib/auth";
import {Image, Question, Team} from "@/lib/types";
import {isGameOver} from "@/app/api/current_question/route"

export async function POST(req: NextRequest) {
    let res

    try {
        await req.json()
            .then(async (json) => {
                if (!client.authStore.isValid) await auth()
                if (!await is_authorized(json.code)) { res = NextResponse.json({}, {status: 401}); return }
                if (!json.base64) { res = NextResponse.json({}, {status: 400}); return }

                const base64 = json.base64

                const team = await client.collection("teams")
                    .getFirstListItem<Team>(`code=${json.code}`)

                await client.collection("images")
                    .create<Image>({
                        "team_id": team.id,
                        "base64": base64
                    })

                const currentQuestion = team.current_question + 1
                await client.collection("teams")
                    .update<Team>(team.id, {
                        "current_question": currentQuestion
                    })

                if (await isGameOver(currentQuestion)) {
                    res = NextResponse.json({gameOver: true}, {status: 200})
                    return
                }

                const question = await client.collection("questions")
                    .getFirstListItem<Question>(`numId=${currentQuestion}`)

                res = NextResponse.json({task: question.task, info: question.info, place: question.place, image: question.image}, {status: 200})

            })
    } catch (e) {
        res = NextResponse.json({}, {status: 500})
        console.error(e)
    }

    return res
}
