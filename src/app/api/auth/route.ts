import {NextRequest, NextResponse} from "next/server";
import {auth, client} from "@/lib/pocketbase";
import {is_authorized} from "@/lib/auth";

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

                res = NextResponse.json({ authorized: true }, {status: 200})
            })
    } catch (e) {
        res = NextResponse.json({}, {status: 500})
        console.error(e)
    }

    return res
}
