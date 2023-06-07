import s from './Footer.module.scss';
import Image from "next/image";
import React from "react";
import Link from "next/link";
const Footer = () => {
    const phones = [
        {
            phone: "+7 (909) 090-90-09",
            link: "+79090909009"
        },
        {
            phone: "+7 (909) 090-90-09",
            link: "+79090909009"
        }
    ];
    return (
        <div className={s.wrap}>
            <section className={s.wrapper}>
                <div className={s.contactInfo}>
                    <Image src={'/logo_blue.png'} alt={'logo'} width={100} height={96}/>
                    <div className={s.links}>
                        {phones.map((p)=>(
                            <a className={s.link} href={`tel:${p.link}`} key={p.link}>{p.phone}</a>
                        ))}
                    </div>
                    <a className={s.link} href={`mailto:info@volga-test.ru`} >info@volga-test.ru</a>
                    <p>Саратов, улица имени Е.И. Пугачёва, 159</p>
                </div>
                <div className={s.chapter}>
                    <h3 className={s.subtitle}>Обязательная сертификация</h3>
                    <Link className={s.serviceLink} href={'/required/id'}>Сертификация ТР ТС</Link>
                    <Link className={s.serviceLink} href={'/required/id'}>Декларация ТР ТС</Link>
                    <Link className={s.serviceLink} href={'/required/id'}>Сертификация ГОСТ Р</Link>
                    <Link className={s.serviceLink} href={'/required/id'}>Декларация ГОСТ Р</Link>
                    <Link className={s.serviceLink} href={'/required/id'}>ЭЗ Роспотребнадзора</Link>
                    <Link className={s.serviceLink} href={'/required/id'}>СГР (государственная регистрация)</Link>
                    <Link className={s.serviceLink} href={'/required/id'}>ССПБ (пожарная безопасность)</Link>
                    <Link className={s.serviceLink} href={'/required/id'}>Разрешительная документация</Link>
                </div>
                <div className={s.chapter}>
                    <h3 className={s.subtitle}>Добровольная сертификация</h3>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Пожарная безопасность</Link>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Антитеррор</Link>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификация ISO</Link>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификат РПО</Link>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Промышленная безопасность</Link>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификация сооружений</Link>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификация для экспорта</Link>
                    <Link className={s.serviceLink} href={'/voluntary/id'}>Добровольный сертификат ГОСТ Р</Link>
                </div>
                <div className={s.chapter}>
                    <h3 className={s.subtitle}>Услуги</h3>
                    <Link className={s.serviceLink} href={'/services/id'}>Нормативно-техническая документация</Link>
                    <Link className={s.serviceLink} href={'/services/id'}>Технические условия на продукцию</Link>
                    <Link className={s.serviceLink} href={'/services/id'}>Штрихкодирование</Link>
                    <Link className={s.serviceLink} href={'/services/id'}>Отказное письмо</Link>
                    <Link className={s.serviceLink} href={'/services/id'}>СБКТС</Link>
                </div>
                <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
            </section>
        </div>
    );
};

export default Footer;