"use client";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import {Main, TextMain} from "@/types/main";
import FormSettings from "@/my_pages/Admin/FormSettings/FormSettings";
import {Dict} from "@/types/admin";

interface Link{
    id: string
    name: string
    link: string
    type: string
}
export interface Settings{
    email: {
        name: string
    }
    address: {
        name: string
    }
    phones: {
        phone: string
    }
    check: {
        main: TextMain[]
        form: TextMain[]
    }
    seo: {
        meta_main: Dict[],
        meta_check: Dict[]
    }
    links: Link[]
}
export default function Home() {
    const getSettings = (): Promise<Settings> => api.get(`/settings`, {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((response) => response.data);
    const {data, isSuccess} = useQuery<Settings>(['settings'], getSettings);
    return (
        <>
            {isSuccess && <FormSettings settings={data}/>}
        </>
    )
}