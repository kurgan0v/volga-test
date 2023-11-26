interface Phone{
    id: string
    phone: string
    area: string
}
interface Region {
    id: string
    name: string
}
interface ServiceType {
    id: string
    name: string
    value: string
    services: {
        id: string
        link_title: string
        link_type: string
    }[]
}

export interface LayoutInfo{
    phones: Phone[]
    regions: Region[]
    services: ServiceType[]
    address: {
        name: string
    }
    email: {
        name: string
    }
    logo: {
        name: string
        value: string
    }
    socials: {
        name: string
        id: string
        value: string
    }[]
}