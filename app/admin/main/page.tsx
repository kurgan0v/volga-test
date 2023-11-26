"use client";
import MainForm from "@/my_pages/Admin/MainForm/MainForm";
import {Main} from "@/types/main";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";


export default function Home() {
    const getMain = (): Promise<Main> => api.get('/main').then((response) => response.data);
    const {data, isSuccess} = useQuery<Main>(['mainAdmin'], getMain);
    return (
        <>
            {isSuccess && <MainForm data={data}/>}
        </>
    )
}
