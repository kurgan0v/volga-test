import {TextMain} from "@/types/main";

export interface DocumentLink{
    id: string
    name: string
    link: string
    type: string
}
export interface CheckType {
    texts: {
        main: TextMain[],
        form: TextMain[]
    }
    links: DocumentLink[]
}