"use client"
import {ServiceResponse} from "@/types/service";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import AllPages from "@/my_pages/Admin/AllPages/AllPages";
import {usePathname} from "next/navigation";
import PageForm from "@/my_pages/Admin/PageForm/PageForm";

export default function Home() {
    const id = usePathname()?.split('/')[3] 
    const getPage = (): Promise<ServiceResponse> => api.get(`/service/${id}`, {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((response) => response.data);
    const {data, isSuccess, refetch} = useQuery<ServiceResponse>(['page', id], getPage);
    return (
        <>
            {isSuccess && <PageForm page={data.service} refetch={refetch}/>}
        </>
    )
}