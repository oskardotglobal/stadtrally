import PocketBase from "pocketbase";

export const client = new PocketBase("http://127.0.0.1:8090");
export const auth = async () => {
    await client.admins.authWithPassword("me@oskar.global", "GsuA3ZxAU&8EniR9");
}
