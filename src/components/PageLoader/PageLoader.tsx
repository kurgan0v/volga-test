"use client";
import s from './PageLoader.module.scss';
import Lottie from "lottie-react";
import loader from "@/lotties/loader.json";

const PageLoader = () => {
    return (
        <div className={s.wrapper}>
            <Lottie className={s.lottie} animationData={loader}/>
        </div>
    )
}
export default PageLoader;