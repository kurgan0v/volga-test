"use client"
import s from './Check.module.scss';
import Image from "next/image";
import Lottie from "lottie-react";
import check from "@/lotties/check.json";
import {TextMain} from "@/types/main";
import {DocumentLink} from "@/types/check";
import ListWithButton from "@/components/ListWithButton/ListWithButton";

interface Props{
    texts: TextMain[]
    links: DocumentLink[]
}
const Check = ({texts, links}: Props) => {
    return (
        <div className={s.wrapper}>
            <Lottie className={s.lottie} animationData={check} loop={1}/>
            <div className={s.content}>
                <h1>{texts?.find(t => t.name === "title")?.value}</h1>
                <p>{texts?.find(t => t.name === "text")?.value}</p>
                <ListWithButton list={links}/>
            </div>
            <Image className={s.circleImg} src={'/circle.png'} alt={'circle'} width={480} height={480}/>
        </div>
    );
};

export default Check;