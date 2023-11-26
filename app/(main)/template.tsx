"use client";
import '@/styles/globals.css';
import '@/styles/main.css';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import React from "react";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import {LayoutInfo} from "@/types/info";

export default function RootLayout({                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const getLayoutInfo = (): Promise<LayoutInfo> => api.get('/info').then((response) => response.data);
    const {data, isSuccess} = useQuery(['info'], getLayoutInfo);

    return (
        <>
            {isSuccess && <Header data={data}/>}
            
            <main>
                {children}
            </main>
            {isSuccess && <Footer data={data}/>}
        </>
    )
}
