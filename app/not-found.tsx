"use client"
import Link from "next/link";
import ButtonCustom from "@/UI/Button/Button";
import notFound from "@/lotties/404.json";
import Lottie from "lottie-react";

export default function Page404(){
    return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", rowGap: 30, flexDirection: "column"}}>
            <Lottie animationData={notFound} style={{width: 400, height: 200}} />
            <h2>Страница не найдена</h2>
            <Link href={"/"}><ButtonCustom>На главную</ButtonCustom></Link>
        </div>
    )
}