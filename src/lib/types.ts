import {Record} from "pocketbase";

export type Team = Record & {
    name?: string,
    member_names?: string,
    current_question: number,
    code: number,
}

export type Image = Record & {
    team_id: string,
    base64: string,
}

export type Question = Record & {
    place: string,
    task: string,
    numId: number,
    image: string,
    info?: string
}
