"use client"
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import EditLinks from "@/UI/EditLinks/EditLinks";

interface Link{
    id: string
    name: string
    link: string
    type: string
}
export default function Home() {
    const getRequests = (): Promise<Link[]> => api.get(`/links`, {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((response) => response.data);
    const {data, isSuccess} = useQuery<Link[]>(['links'], getRequests);
    return (
        <>
            {data && <EditLinks links={data} type={"service"}/>}
        </>
    )
}