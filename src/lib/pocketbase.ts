import PocketBase from "pocketbase";

export const client = new PocketBase(process.env.POCKETBASE_URL);

export const auth = async () => {
    // @ts-ignore
    await client.admins.authWithPassword(process.env.POCKETBASE_USER, process.env.POCKETBASE_PASSWD);
}
