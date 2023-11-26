import s from './Footer.module.scss';
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {LayoutInfo} from "@/types/info";
import CustomImage from "@/components/CustomImage/CustomImage";
const Footer = ({data}:{data: LayoutInfo}) => {

    return (
        <div className={s.wrap}>
            <section className={s.wrapper}>
                <div className={s.contactInfo}>
                    <Link href={'/'}><CustomImage src={data.logo.value} alt={data.logo.name} width={100} height={96}/></Link>
                    <div className={s.links}>
                        {data.phones.map((p)=>(
                            <a className={s.link} href={`tel:+${p.phone.replace(/[^0-9]/g,"")}`} key={p.id}>{p.phone}</a>
                        ))}
                    </div>
                    <a className={s.link} href={`mailto:${data.email.name}`}>{data.email.name}</a>
                    <p>{data.address.name}</p>
                </div>
                {data.services.map((service,i) => (
                    <div className={s.lastChapter} key={service.id}><div className={s.chapter} >
                        <h3 className={s.subtitle}>{service.name}</h3>
                        {service.services.map(serv => (
                            <Link className={s.serviceLink} href={`/service/${serv.id}`} key={serv.id}>{serv.link_title}</Link>
                        ))}

                    </div>{data.services.length - 1 === i ? <div className={s.socials}>
                        {data.socials.map(social => (
                            <a href={social.name} key={social.id}><Image src={`/${social.value}`} width={35} height={35} alt={"social"}/></a>
                        ))}
                    </div> : null}</div>
                ))}
                <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
            </section>
        </div>
    );
};

export default Footer;
