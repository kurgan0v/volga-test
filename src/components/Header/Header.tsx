"use client";
import React from 'react';
import Image from "next/image";
import {Select, Dropdown} from "antd";
import s from './Header.module.scss';
import './antdCustom.css';
import Link from "next/link";
const {Option} = Select;
import type { MenuProps } from 'antd';
const Header = () => {

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
    const regions = [
        {
            id: 1,
            name: 'Саратовская обл.',
        },
        {
            id: 2,
            name: 'Пензенская обл.'
        },
    ];
    const chapterRequired: MenuProps['items'] = [
        {
            key: 1,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>Сертификация ТР ТС</Link>
            )
        },
        {
            key: 2,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>Декларация ТР ТС</Link>
            )
        },
        {
            key: 3,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>Сертификация ГОСТ Р</Link>
            )
        },
        {
            key: 4,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>Декларация ГОСТ Р</Link>
            )
        },
        {
            key: 5,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>ЭЗ Роспотребнадзора</Link>
            )
        },
        {
            key: 6,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>СГР (государственная регистрация)</Link>
            )
        },
        {
            key: 7,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>ССПБ (пожарная безопасность)</Link>
            )
        },
        {
            key: 8,
            label: (
                <Link className={s.serviceLink} href={'/required/id'}>Разрешительная документация</Link>
            )
        },
    ];
    const chapterVoluntary: MenuProps['items'] = [
        {
            key: 1,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Пожарная безопасность</Link>
            )
        },
        {
            key: 2,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Антитеррор</Link>
            )
        },
        {
            key: 3,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификация ISO</Link>
            )
        },
        {
            key: 4,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификат РПО</Link>
            )
        },
        {
            key: 5,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Промышленная безопасность</Link>
            )
        },
        {
            key: 6,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификация сооружений</Link>
            )
        },
        {
            key: 7,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Сертификация для экспорта</Link>
            )
        },
        {
            key: 8,
            label: (
                <Link className={s.serviceLink} href={'/voluntary/id'}>Добровольный сертификат ГОСТ Р</Link>
            )
        },
    ];
    const chapterServices: MenuProps['items'] = [
        {
            key: 1,
            label: (
                <Link className={s.serviceLink} href={'/services/id'}>Нормативно-техническая документация</Link>
            )
        },
        {
            key: 2,
            label: (
                <Link className={s.serviceLink} href={'/services/id'}>Технические условия на продукцию</Link>
            )
        },
        {
            key: 3,
            label: (
                <Link className={s.serviceLink} href={'/services/id'}>Штрихкодирование</Link>
            )
        },
        {
            key: 4,
            label: (
                <Link className={s.serviceLink} href={'/services/id'}>Отказное письмо</Link>
            )
        },
        {
            key: 5,
            label: (
                <Link className={s.serviceLink} href={'/services/id'}>СБКТС</Link>
            )
        },
    ];

    const chapters = [
        {
            name: "Обязательная сертификация",
            links: chapterRequired
        },
        {
            name: "Добровольная сертификация",
            links: chapterVoluntary
        },
        {
            name: "Услуги",
            links: chapterServices
        }
    ];
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Сертификат ТР ТС/ЕАЭС
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Декларация ТР ТС
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    СГР (государственная регистрация)
                </a>
            ),
        },
    ];
    return (
        <div className={s.wrapper}>
            <div className={s.nav}>
                <Image src={'/logo_blue.png'} alt={'logo'} width={50} height={48}/>
                <ul className={s.chapters}>
                    {
                        chapters.map(({name,links}, i) => (
                            <Dropdown menu={{items: links}} placement="bottomLeft" key={i}>
                                <li className={s.chapter} key={name}>{name}</li>
                            </Dropdown>

                        ))
                    }
                </ul>
                <div className={s.contactInfo}>
                    <div className={s.regionSelect}>
                        <svg className={s.prefixIcon} xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none">
                            <path d="M8.49994 0C4.30629 0 0.894531 3.41176 0.894531 7.60536C0.894531 12.8098 7.70062 20.4501 7.9904 20.7728C8.26258 21.076 8.73778 21.0754 9.00947 20.7728C9.29925 20.4501 16.1053 12.8098 16.1053 7.60536C16.1053 3.41176 12.6935 0 8.49994 0ZM8.49994 11.4318C6.39001 11.4318 4.67351 9.71529 4.67351 7.60536C4.67351 5.49544 6.39005 3.77893 8.49994 3.77893C10.6098 3.77893 12.3263 5.49548 12.3263 7.6054C12.3263 9.71533 10.6098 11.4318 8.49994 11.4318Z" fill="white"/>
                        </svg>
                        <Select
                            className={s.regions}
                            suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M6.99996 10.9902C6.74905 10.9902 6.49818 10.8944 6.30688 10.7032L0.287198 4.68344C-0.0957326 4.30051 -0.0957326 3.67965 0.287198 3.29688C0.669973 2.9141 1.29071 2.9141 1.67367 3.29688L6.99996 8.62348L12.3263 3.29706C12.7092 2.91429 13.3299 2.91429 13.7126 3.29706C14.0957 3.67984 14.0957 4.3007 13.7126 4.68363L7.69304 10.7034C7.50165 10.8946 7.25078 10.9902 6.99996 10.9902Z" fill="white"/>
                            </svg>}
                            defaultValue={1}
                        >
                            {
                                regions.map((r)=>(
                                    <Option value={r.id} key={r.id}>{r.name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className={s.phones}>
                        {phones.map((p)=>(
                            <a className={s.phone} href={`tel:${p.link}`} key={p.link}>{p.phone}</a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;