import CertificateEac from "@/icons/CertificateEac/CertificateEac";
import s from './FirstScreen.module.scss';
import GostR from "@/icons/StandardIcons/GostR";
import DeclarationEac from "@/icons/DeclarationEac/DeclarationEac";
import Image from "next/image";
import Eac from "@/icons/StandardIcons/Eac";
import Iso from "@/icons/StandardIcons/Iso";
import Rzn from "@/icons/StandardIcons/Rzn";
import ButtonCustom from "@/UI/Button/Button";
import CircleAngular from "@/icons/CircleAngular/CircleAngular";
import CircleAngularFilled from "@/icons/CircleAngularFilled/CircleAngularFilled";

export default function FirstScreen() {
    const bullets = [
        {
            key: "1",
            text: "Оформление документов с занесением в реестр",
            img: "/icons/cloud.svg"
        },
        {
            key: "2",
            text: "Сроки готовности от 1 дня",
            img: "/icons/calendar.svg"
        }
    ]
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
                        <h1 className={s.header}>Сертификация.<br/>
                            Декларирование.<br/>
                            разрешительная документация.</h1>
                    </div>
                    <div className={s.bullets}>
                        {bullets.map(b => (
                            <div className={s.bullet} key={b.key}>
                                <Image src={b.img} alt={b.text} width={50} height={50}/>
                                <p>{b.text}</p>
                            </div>
                        ))}
                    </div>
                    <ButtonCustom>Рассчитать стоимость</ButtonCustom>
                </div>
                <div className={s.mainImg}>
                    <CertificateEac className={s.certEac}/>
                    <Image className={s.circleImg} src={'/circle.png'} alt={'circle'} width={700} height={700}/>
                    <DeclarationEac className={s.decEac}/>
                </div>
            </div>
        </section>
    )
}