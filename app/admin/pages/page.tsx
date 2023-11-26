"use client"
import {Pages} from "@/types/main";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import MainForm from "@/my_pages/Admin/MainForm/MainForm";
import AllPages from "@/my_pages/Admin/AllPages/AllPages";

export default function Home() {
    const getPages = (): Promise<Pages> => api.get('/pages', {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
    }).then((response) => response.data);
    const {data, isSuccess} = useQuery<Pages>(['allPages'], getPages);
    return (
        <>
            {isSuccess && <AllPages pages={data}/>}
        </>
    )
}