import {NextRequest, NextResponse} from "next/server";
import {auth, client} from "@/lib/pocketbase";

export async function POST(req: NextRequest) {
    let res

    try {
        await req.json()
            .then(async (json) => {
                if (!json.code) {
                    res = NextResponse.json({status: 400, authorized: false})
                    return
                }

                if (!client.authStore.isValid) await auth()
                const record = await client.collection("teams").getFirstListItem(`code=${json.code}`)

                if (!record?.id) {
                    res = NextResponse.json({status: 401, authorized: false})
                    return
                }

                res = NextResponse.json({status: 200, authorized: true})
            })
    } catch {
        res = NextResponse.json({status: 400, authorized: false})
    }

    return res
}
