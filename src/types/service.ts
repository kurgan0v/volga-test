import {TextMain} from "@/types/main";
import {DocumentLink} from "@/types/check";

export interface Service {
    id: string
    title: string
    type: string
    link_title: string
    service_icon?: string
    main_icon?: string
    main_title?: string
    main_text?: string
    links?: DocumentLink[]
    documents?: string[]
    link_type: string
}
export interface ServiceResponse {
    service: Service
    texts: {
        form: TextMain[]
    }
}