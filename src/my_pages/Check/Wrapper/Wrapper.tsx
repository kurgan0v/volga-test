"use client"
import FormBlock from "@/components/FormBlock/FormBlock";
import Check from "@/my_pages/Check/Check/Check";
import {CheckType} from "@/types/check";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import PageLoader from "@/components/PageLoader/PageLoader";

export default function Wrapper() {
    const getCheck = (): Promise<CheckType> => api.get('/check').then((response) => response.data);
    const {data, isSuccess} = useQuery<CheckType>(['check'], getCheck);
    return (
        <div>
            {isSuccess ? <>
                <Check texts={data.texts.main} links={data.links}/>
                <FormBlock texts={data.texts.form} from={"Проверка сертификатов"}/>
            </> : <PageLoader/>}
        </div>
    )
}