"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import s from './Reviews.module.scss';
import './custom.css';
import Image from "next/image";
const Reviews = () => {
    return (
        <section className={s.wrapper}>
            <h2 className={s.title}>Отзывы о работе с нами</h2>
            <div className={s.reviews}>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    initialSlide={1}
                    loop={true}
                    className={s.swiper}
                >
                    <SwiperSlide className={s.review}>
                        <Image src={'/review1.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review2.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review1.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review2.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review1.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review2.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    initialSlide={1}
                    loop={true}
                    className={`${s.swiper} ${s.swiperSecond}`}
                >
                    <SwiperSlide className={s.review}>
                        <Image src={'/review1.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review2.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review1.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review2.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review1.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                    <SwiperSlide className={s.review}>
                        <Image src={'/review2.png'} alt={'review'} width={150} height={150}/>
                        <h3>Название компании</h3>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default Reviews;