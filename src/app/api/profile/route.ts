import {NextRequest, NextResponse} from "next/server";
import {auth, client} from "@/lib/pocketbase";
import {is_authorized} from "@/lib/auth";
import {Team} from "@/lib/types";

export async function POST(req: NextRequest) {
    let res

    try {
        await req.json()
            .then(async (json) => {
                if (!client.authStore.isValid) await auth()

                if (!await is_authorized(json.code)) {
                    res = NextResponse.json({}, {status: 401})
                    return
                }

                if (!json.name && !json.member_names) {
                    res = NextResponse.json({}, {status: 400})
                    return
                }

                const record = await client.collection("teams")
                    .getFirstListItem<Team>(`code=${json.code}`)


                if (json.name) {
                    await client.collection("teams")
                        .update<Team>(record.id, {
                            "name": json.name
                        })
                }

                if (json.member_names) {
                    await client.collection("teams")
                        .update<Team>(record.id, {
                            "member_names": json.member_names
                        })
                }

                res = NextResponse.json({}, {status: 200})
            })
    } catch (e) {
        res = NextResponse.json({}, {status: 500})
        console.error(e)
    }

    return res
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    try {
        if (!client.authStore.isValid) await auth()
        if (!await is_authorized(code)) return NextResponse.json({}, {status: 401})

        const record = await client.collection("teams")
            .getFirstListItem<Team>(`code=${code}`)

        return NextResponse.json({name: record.name, member_names: record.member_names}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({}, {status: 500})
    }
}
