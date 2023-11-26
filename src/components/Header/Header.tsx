"use client";
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Select, Dropdown, Drawer, Button, Menu} from "antd";
import s from './Header.module.scss';
import './antdCustom.css';
import Link from "next/link";

const {Option} = Select;
import {LayoutInfo} from "@/types/info";
import CustomImage from "@/components/CustomImage/CustomImage";
import {CloseOutlined, MenuOutlined} from "@ant-design/icons";
import ButtonCustom from "@/UI/Button/Button";


const Header = ({data}: { data: LayoutInfo }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div className={s.wrapper}>
            <div className={s.nav}>
                <Link href={'/'}><CustomImage src={data.logo.value} alt={data.logo.name} width={50} height={48}/></Link>
                <div className={s.drawer}>
                    <ButtonCustom onClick={() => setOpenDrawer(!openDrawer)}>
                        <MenuOutlined />
                    </ButtonCustom>
                    <Drawer placement="right" onClose={() => setOpenDrawer(!openDrawer)} open={openDrawer} closeIcon={<ButtonCustom className={s.drawerBtn}>
                        <CloseOutlined />
                    </ButtonCustom>} >
                        <ul className={s.drawerChapters}>
                            {
                                data.services.map(service => (
                                    <Dropdown menu={{
                                        items: service.services.map(serviceLink => (
                                            {key: serviceLink.id,
                                                label: <Link className={s.serviceLink}
                                                             href={`/service/${serviceLink.id}`}>{serviceLink.link_title}</Link>
                                            }
                                        ))
                                    }} placement="bottomLeft" key={service.id}>
                                        <li className={s.chapter}>{service.name}</li>
                                    </Dropdown>
                                ))
                            }
                            <Link href={'/check'}><li className={s.chapter}>Проверка сертификата</li></Link>
                        </ul>
                        <div className={s.contactInfoDrawer}>
                            <div className={s.regionSelect}>
                                <svg className={s.prefixIcon} xmlns="http://www.w3.org/2000/svg" width="17" height="21"
                                     viewBox="0 0 17 21" fill="none">
                                    <path
                                        d="M8.49994 0C4.30629 0 0.894531 3.41176 0.894531 7.60536C0.894531 12.8098 7.70062 20.4501 7.9904 20.7728C8.26258 21.076 8.73778 21.0754 9.00947 20.7728C9.29925 20.4501 16.1053 12.8098 16.1053 7.60536C16.1053 3.41176 12.6935 0 8.49994 0ZM8.49994 11.4318C6.39001 11.4318 4.67351 9.71529 4.67351 7.60536C4.67351 5.49544 6.39005 3.77893 8.49994 3.77893C10.6098 3.77893 12.3263 5.49548 12.3263 7.6054C12.3263 9.71533 10.6098 11.4318 8.49994 11.4318Z"
                                        fill="white"/>
                                </svg>
                                <Select
                                    className={s.regions}
                                    suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                     viewBox="0 0 14 14" fill="none">
                                        <path
                                            d="M6.99996 10.9902C6.74905 10.9902 6.49818 10.8944 6.30688 10.7032L0.287198 4.68344C-0.0957326 4.30051 -0.0957326 3.67965 0.287198 3.29688C0.669973 2.9141 1.29071 2.9141 1.67367 3.29688L6.99996 8.62348L12.3263 3.29706C12.7092 2.91429 13.3299 2.91429 13.7126 3.29706C14.0957 3.67984 14.0957 4.3007 13.7126 4.68363L7.69304 10.7034C7.50165 10.8946 7.25078 10.9902 6.99996 10.9902Z"
                                            fill="white"/>
                                    </svg>}
                                    defaultValue={data.regions[0].id}
                                >
                                    {
                                        data.regions.map((r) => (
                                            <Option value={r.id} key={r.id}>{r.name}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className={s.phones}>
                                {data.phones.map((p) => (
                                    <a className={s.phone} href={`tel:+${p.phone.replace(/[^0-9]/g, "")}`}
                                       key={p.id}>{p.phone}</a>
                                ))}
                            </div>
                        </div>
                    </Drawer>
                </div>
                <div className={s.content}><ul className={s.chapters}>
                    {
                        data.services.map(service => (
                            <Dropdown menu={{
                                items: service.services.map(serviceLink => (
                                    {key: serviceLink.id,
                                        label: <Link className={s.serviceLink}
                                                     href={`/service/${serviceLink.id}`}>{serviceLink.link_title}</Link>
                                    }
                                ))
                            }} placement="bottomLeft" key={service.id}>
                                <li className={s.chapter}>{service.name}</li>
                            </Dropdown>
                        ))
                    }
                    <Link href={'/check'}><svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                               width="512" height="512" x="0" y="0"
                                               viewBox="0 0 495.787 495.787"
                                               className={s.checkIcon}>
                        <g>
                            <path
                                d="M247.893 0C110.986 0 0 110.986 0 247.893c.118 136.859 111.034 247.776 247.893 247.893 136.908 0 247.893-110.986 247.893-247.893S384.801 0 247.893 0zm0 474.453c-125.126 0-226.56-101.434-226.56-226.56.235-125.028 101.532-226.325 226.56-226.56 125.126 0 226.56 101.434 226.56 226.56s-101.434 226.56-226.56 226.56z"
                                fill="currentColor" data-original="currentColor" className=""></path>
                            <path
                                d="m276.053 185.813-101.76 101.76L126.507 240l-14.934 15.147 62.72 62.506L290.987 200.96zM368.853 185.813l-101.546 101.76-13.654-13.866-15.146 15.146 28.8 28.8L384 200.96z"
                                fill="currentColor" data-original="currentColor" className=""></path>
                        </g>
                    </svg></Link>
                </ul>
                    <div className={s.contactInfo}>
                        <div className={s.regionSelect}>
                            <svg className={s.prefixIcon} xmlns="http://www.w3.org/2000/svg" width="17" height="21"
                                 viewBox="0 0 17 21" fill="none">
                                <path
                                    d="M8.49994 0C4.30629 0 0.894531 3.41176 0.894531 7.60536C0.894531 12.8098 7.70062 20.4501 7.9904 20.7728C8.26258 21.076 8.73778 21.0754 9.00947 20.7728C9.29925 20.4501 16.1053 12.8098 16.1053 7.60536C16.1053 3.41176 12.6935 0 8.49994 0ZM8.49994 11.4318C6.39001 11.4318 4.67351 9.71529 4.67351 7.60536C4.67351 5.49544 6.39005 3.77893 8.49994 3.77893C10.6098 3.77893 12.3263 5.49548 12.3263 7.6054C12.3263 9.71533 10.6098 11.4318 8.49994 11.4318Z"
                                    fill="white"/>
                            </svg>
                            <Select
                                className={s.regions}
                                suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                 viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M6.99996 10.9902C6.74905 10.9902 6.49818 10.8944 6.30688 10.7032L0.287198 4.68344C-0.0957326 4.30051 -0.0957326 3.67965 0.287198 3.29688C0.669973 2.9141 1.29071 2.9141 1.67367 3.29688L6.99996 8.62348L12.3263 3.29706C12.7092 2.91429 13.3299 2.91429 13.7126 3.29706C14.0957 3.67984 14.0957 4.3007 13.7126 4.68363L7.69304 10.7034C7.50165 10.8946 7.25078 10.9902 6.99996 10.9902Z"
                                        fill="white"/>
                                </svg>}
                                defaultValue={data.regions[0].id}
                            >
                                {
                                    data.regions.map((r) => (
                                        <Option value={r.id} key={r.id}>{r.name}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className={s.phones}>
                            {data.phones.map((p) => (
                                <a className={s.phone} href={`tel:+${p.phone.replace(/[^0-9]/g, "")}`}
                                   key={p.id}>{p.phone}</a>
                            ))}
                        </div>
                    </div></div>

            </div>
        </div>
    );
};

export default Header;
