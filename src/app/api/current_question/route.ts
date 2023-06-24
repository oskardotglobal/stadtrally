import {NextRequest, NextResponse} from "next/server";
import {auth, client} from "@/lib/pocketbase";
import {is_authorized} from "@/lib/auth";
import {Question, Team} from "@/lib/types";

export async function isGameOver(question: number) {
    const questions = await client.collection("questions")
        .getFullList<Question>()

    return question >= questions.length + 1
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    try {
        if (!client.authStore.isValid) await auth()
        if (!await is_authorized(code) || !code) return NextResponse.json({}, {status: 401})

        const team = await client.collection("teams")
            .getFirstListItem<Team>(`code=${code}`)

        if (await isGameOver(team.current_question)) {
            return NextResponse.json({gameOver: true}, {status: 200})
        }

        const question = await client.collection("questions")
            .getFirstListItem<Question>(`numId=${team.current_question}`)

        return NextResponse.json({task: question.task, info: question.info, place: question.place, image: question.image}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({}, {status: 500})
    }
}
