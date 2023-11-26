"use client";
import s from './AdminLayout.module.scss';
import React, {useState} from "react";
import Link from "next/link";
import {useMutation} from "react-query";
import {api} from "@/components/QueryProvider/QueryProvider";
import {usePathname, useRouter} from "next/navigation";
import {CloseOutlined, MenuOutlined} from "@ant-design/icons";
import ButtonCustom from "@/UI/Button/Button";
import {Drawer} from "antd";

const AdminLayout = ({
                         children,
                     }: {
    children: React.ReactNode
}) => {
    const [show, setShow] = useState(false);
    const { push } = useRouter();
    const path = usePathname()?.split('/')[2]
    const mutation = useMutation({
        mutationFn: () => {
            return api.get('/logout').then(r => {
                localStorage.setItem('accessToken', r.data.accessToken);
                push('/login')
            })
        }
    });
    return (
        <div className={'admin'}>
            <Drawer placement="right" className={s.drawer} onClose={() => setShow(!show)} open={show} closeIcon={<ButtonCustom className={s.drawerBtn}>
                <CloseOutlined />
            </ButtonCustom>} >
                <div className={s.sidebar} onClick={()=>setShow(false)}>
                    <Link href={'/admin/main'} className={`${s.sidebarLink} ${path === "main" ? s.active : ""}`}>Главная</Link>
                    <Link href={'/admin/pages'} className={`${s.sidebarLink} ${path === "pages" ? s.active : ""}`}>Страницы</Link>
                    <Link href={'/admin/requests'} className={`${s.sidebarLink} ${path === "requests" ? s.active : ""}`}>Заявки</Link>
                    <Link href={'/admin/links'} className={`${s.sidebarLink} ${path === "links" ? s.active : ""}`}>Ссылки</Link>
                    <Link href={'/admin/settings'} className={`${s.sidebarLink} ${path === "settings" ? s.active : ""}`}>Настройки</Link>
                    <p className={`${s.sidebarLink}`} onClick={()=>mutation.mutate()}>Выход</p>
                </div>
            </Drawer>
            <div className={s.nav}>
                <div className={s.user}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <g clipPath="url(#clip0_153_9052)">
                            <path
                                d="M20.6956 19.8498C18.7326 19.8498 16.8137 19.2677 15.1816 18.1771C13.5495 17.0866 12.2774 15.5365 11.5262 13.723C10.775 11.9094 10.5784 9.91387 10.9614 7.98863C11.3443 6.06339 12.2896 4.29495 13.6776 2.90693C15.0656 1.51891 16.8341 0.573662 18.7593 0.190708C20.6846 -0.192245 22.6801 0.00430024 24.4936 0.75549C26.3072 1.50668 27.8572 2.77878 28.9478 4.41091C30.0384 6.04305 30.6204 7.96192 30.6204 9.92488C30.6175 12.5562 29.5709 15.079 27.7103 16.9396C25.8496 18.8002 23.3269 19.8468 20.6956 19.8498ZM20.6956 2.75691C19.2779 2.75691 17.892 3.17731 16.7133 3.96493C15.5345 4.75256 14.6158 5.87204 14.0732 7.18182C13.5307 8.49159 13.3888 9.93283 13.6653 11.3233C13.9419 12.7137 14.6246 13.9909 15.627 14.9934C16.6295 15.9959 17.9067 16.6785 19.2972 16.9551C20.6876 17.2317 22.1289 17.0897 23.4386 16.5472C24.7484 16.0047 25.8679 15.086 26.6555 13.9072C27.4431 12.7284 27.8635 11.3426 27.8635 9.92488C27.8613 8.02449 27.1054 6.20256 25.7617 4.85878C24.4179 3.515 22.596 2.7591 20.6956 2.75691ZM37.9262 40C37.5607 40 37.21 39.8548 36.9515 39.5963C36.693 39.3378 36.5478 38.9871 36.5478 38.6215V35.214C36.5449 32.5966 35.5038 30.0871 33.653 28.2363C31.8022 26.3855 29.2928 25.3444 26.6753 25.3415H14.7158C12.0984 25.3444 9.58896 26.3855 7.73814 28.2363C5.88733 30.0871 4.84625 32.5966 4.84334 35.214V38.6215C4.84334 38.9871 4.69811 39.3378 4.4396 39.5963C4.18108 39.8548 3.83047 40 3.46488 40C3.09929 40 2.74868 39.8548 2.49017 39.5963C2.23166 39.3378 2.08643 38.9871 2.08643 38.6215V35.214C2.09044 31.8657 3.42232 28.6557 5.78992 26.2881C8.15753 23.9205 11.3675 22.5886 14.7158 22.5846H26.6739C30.0225 22.5883 33.2328 23.92 35.6007 26.2876C37.9686 28.6553 39.3007 31.8655 39.3047 35.214V38.6215C39.3047 38.9871 39.1595 39.3378 38.901 39.5963C38.6425 39.8548 38.2918 40 37.9262 40Z"
                                fill="currentColor"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_153_9052">
                                <rect width="40" height="40" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <p>Администратор</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"
                     className={s.logout}
                     onClick={()=> mutation.mutate()}
                >
                    <g clipPath="url(#clip0_153_9048)">
                        <path
                            d="M19.3227 37.708H8.88976C6.05444 37.708 3.75393 35.399 3.75393 32.5722V7.42784C3.75393 4.59253 6.06293 2.29202 8.88976 2.29202H19.4925C20.1291 2.29202 20.6385 1.78268 20.6385 1.14601C20.6385 0.509338 20.1291 0 19.4925 0H8.88976C4.78959 0 1.46191 3.33616 1.46191 7.42784V32.5722C1.46191 36.6723 4.79808 40 8.88976 40H19.3227C19.9594 40 20.4687 39.4907 20.4687 38.854C20.4687 38.2173 19.9509 37.708 19.3227 37.708Z"
                            fill="currentColor"/>
                        <path
                            d="M38.2021 19.1935L30.9186 11.9099C30.4686 11.46 29.7471 11.46 29.2972 11.9099C28.8473 12.3599 28.8473 13.0814 29.2972 13.5313L34.6282 18.8624H11.377C10.7403 18.8624 10.231 19.3717 10.231 20.0084C10.231 20.6451 10.7403 21.1544 11.377 21.1544H34.6282L29.2972 26.4855C28.8473 26.9354 28.8473 27.657 29.2972 28.1069C29.5179 28.3276 29.815 28.4464 30.1036 28.4464C30.3922 28.4464 30.6894 28.3361 30.9101 28.1069L38.1936 20.8234C38.652 20.365 38.652 19.6349 38.2021 19.1935Z"
                            fill="currentColor"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_153_9048">
                            <rect width="40" height="40" fill="currentColor"/>
                        </clipPath>
                    </defs>
                </svg>
                <ButtonCustom onClick={() => setShow(!show)} className={s.drawerBtn}>
                    <MenuOutlined />
                </ButtonCustom>
            </div>
            <div className={s.content}>
                <div className={s.sidebar}>
                    <Link href={'/admin/main'} className={`${s.sidebarLink} ${path === "main" ? s.active : ""}`}>Главная</Link>
                    <Link href={'/admin/pages'} className={`${s.sidebarLink} ${path === "pages" ? s.active : ""}`}>Страницы</Link>
                    <Link href={'/admin/requests'} className={`${s.sidebarLink} ${path === "requests" ? s.active : ""}`}>Заявки</Link>
                    <Link href={'/admin/links'} className={`${s.sidebarLink} ${path === "links" ? s.active : ""}`}>Ссылки</Link>
                    <Link href={'/admin/settings'} className={`${s.sidebarLink} ${path === "settings" ? s.active : ""}`}>Настройки</Link>
                </div>
                <div className={s.contentMain}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;