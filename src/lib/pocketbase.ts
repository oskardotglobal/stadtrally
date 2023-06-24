import PocketBase from "pocketbase";
import {printAndExit} from "next/dist/server/lib/utils";

export const client = new PocketBase(process.env.POCKETBASE_URL);

export const auth = async () => {
    if (
        !process.env.POCKERBASE_USER
        || !process.env.POCKETBASE_PASSWD
        || !process.env.POCKETBASE_URL
    ) printAndExit("Check your env", -1)

    // @ts-ignore
    await client.admins.authWithPassword(process.env.POCKETBASE_USER, process.env.POCKETBASE_PASSWD);
}
