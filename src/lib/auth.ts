import {auth, client} from "@/lib/pocketbase";
import {Team} from "@/lib/types";

export async function is_authorized(code: string | null | undefined) {
    if (!code) return false
    if (!client.authStore.isValid) await auth()

    try {
        const record = await client.collection("teams")
            .getFirstListItem<Team>(`code=${code}`)
        return !!record?.id
    } catch (e) {
        console.error(e)
        return false
    }
}
