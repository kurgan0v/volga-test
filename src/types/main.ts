import {Service} from "@/types/service";

export interface TextMain {
    id: string
    name: string
    value: string
    section: string
    page: string
}
export interface Bullet{
    id: string
    img: string
    title: string
    subtitle: string
    text: string
    type: string
}
export interface Review{
    id: string
    img: string
    name: string
}
export interface Main {
    texts: {
        first: TextMain[]
        bullets: TextMain[]
        numbers: TextMain[]
        form: TextMain[]
        steps: TextMain[]
        reviews: TextMain[]
        promo: TextMain[]
    }
    bullets: {
        first: Bullet[]
        bullets: Bullet[]
        numbers: Bullet[]
        steps: Bullet[]
    }
    reviews: Review[]
    imagePromo: {
        name: string
        value: string
    }
}

export interface Pages {
    required: Service[],
    voluntary: Service[],
    services: Service[]
}