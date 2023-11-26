import CertificateEac from "@/icons/CertificateEac/CertificateEac";
import s from './FirstScreen.module.scss';
import GostR from "@/icons/StandardIcons/GostR";
import DeclarationEac from "@/icons/DeclarationEac/DeclarationEac";
import Image from "next/image";
import Eac from "@/icons/StandardIcons/Eac";
import Iso from "@/icons/StandardIcons/Iso";
import Rzn from "@/icons/StandardIcons/Rzn";
import ButtonCustom from "@/UI/Button/Button";
import {Bullet, TextMain} from "@/types/main";
import CustomImage from "@/components/CustomImage/CustomImage";
import Link from "next/link";
import { motion } from "framer-motion"

interface FirstProps{
    texts: TextMain[]
    bullets: Bullet[]
}
export default function FirstScreen({texts,bullets}: FirstProps) {
    return (
        <section>
            <div className={s.firstScreen}>
                <div className={s.mainInfo}>
                    <div>
                        <div className={s.standards}>
                            <Eac />
                            <GostR />
                            <Iso />
                            <Rzn />
                        </div>
                        <h1 className={s.header}>{texts?.find(t => t.name === "title")?.value.split('.').map((word, i) => (
                            <div key={i}>
                                {word}.
                                <br/>
                            </div>
                        ))}</h1>
                    </div>
                    <div className={s.bullets}>
                        {bullets && bullets.map(b => (
                            <div className={s.bullet} key={b.id}>
                                <CustomImage src={b.img} alt={b.text} width={50} height={50}/>
                                <p>{b.text}</p>
                            </div>
                        ))}
                    </div>
                    <Link href="#form1">
                        <ButtonCustom>{texts?.find(t => t.name === "button")?.value}</ButtonCustom>
                    </Link>
                </div>
                <div className={s.mainImg}>
                    <motion.div
                        animate={{ translateY:[0, -20, 0], translateX:[0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut"}}
                    >
                        <CertificateEac className={s.certEac}/>
                    </motion.div>
                    <Image className={s.circleImg} src={'/circle.png'} alt={'circle'} width={700} height={700}/>
                    <motion.div
                        animate={{ translateY:[0, -20, 0], translateX:[0, -30, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut"}}
                    >
                        <DeclarationEac className={s.decEac}/>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}