"use client";
import {useQuery} from "react-query";
import {api} from "@/components/QueryProvider/QueryProvider";

interface Meta{
    title?: string
    description?: string
    keywords?: string
}

export default function useMeta(){
    const getMain = (): Promise<Meta> => api.get('/main').then((response) => response.data);
    return useQuery<Meta>(['main'], getMain);
}