"use client"
import {usePathname, useRouter} from 'next/navigation'
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import Service from "@/my_pages/Service/Service";
import FormBlock from "@/components/FormBlock/FormBlock";
import {ServiceResponse} from "@/types/service";
import {useEffect} from "react";
import PageLoader from "@/components/PageLoader/PageLoader";

export default function Home() {
    const id = usePathname()?.split('/')[2]
    const getServiceById = (): Promise<ServiceResponse> => api.get(`/service/${id}`).then((response) => response.data);
    const {data, isSuccess, isError} = useQuery<ServiceResponse>([id], getServiceById);
    const { push } = useRouter();
    useEffect(()=>{
        if(isError){
            push('/')
        }
    }, [isError]);
    return (
        <>
            {isSuccess ? <><Service service={data.service}/>
                <FormBlock texts={data.texts.form} from={data.service.title}/></> : <PageLoader/>}
        </>
    )
}