"use client"
import s from './Promotion.module.scss';
import Image from "next/image";
import ButtonCustom from "@/UI/Button/Button";
import {TextMain} from "@/types/main";
import CustomImage from "@/components/CustomImage/CustomImage";
import {Modal} from "antd";
import {useState} from "react";
import FormBlock from "@/components/FormBlock/FormBlock";
interface FirstProps{
    texts: TextMain[]
    image: {
        name: string
        value: string
    }
}
const Promotion = ({texts, image}: FirstProps) => {
    const [open, setOpen] = useState(false);
    return (
        <section className={s.wrapper}>
            <CustomImage className={s.promotionImg} src={image?.value} alt={image.name} width={380} height={380}/>
            <Image className={s.circle} src={'/circle.png'} alt={'circle'} width={700} height={700}/>
            <div className={s.promotionInfo}>
                <h2 className={s.title}>{texts?.find(t => t.name === "title")?.value}</h2>
                <p className={s.text}>{texts?.find(t => t.name === "text")?.value}</p>
                <ButtonCustom onClick={()=>{setOpen(true)}}>{texts?.find(t => t.name === "button")?.value}</ButtonCustom>
            </div>
            <Modal
                open={open}
                footer={<></>}
                width={890}
                onCancel={()=>setOpen(false)}
            >
                <FormBlock texts={texts} from={"Блок с акцией"} isModal={true}/>
            </Modal>
        </section>
    );
};

export default Promotion;