"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import s from './Reviews.module.scss';
import './custom.css';
import Image from "next/image";
import {Review, TextMain} from "@/types/main";
import CustomImage from "@/components/CustomImage/CustomImage";
interface FirstProps{
    texts: TextMain[]
    reviews: Review[]
}
const Reviews = ({texts, reviews}: FirstProps) => {
    function chunkArray(array: Review[], chunk:number) {
        const newArray = [];
        for (let i = 0; i < array.length; i += chunk) {
            newArray.push(array.slice(i, i + chunk));
        }
        return newArray;
    }

    const res = chunkArray(reviews, 2);
    return (
        <section className={s.wrapper}>
            <h2 className={s.title}>{texts?.find(t => t.name === "title")?.value}</h2>
            <div className={s.reviews}>
                {res.length > 11 ? res.map((arr, i) => (
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={4}
                        loop={true}
                        className={s.swiper}
                        key={i}
                    >
                        {arr.map(rev => (
                            <SwiperSlide className={s.review} key={rev.id}>
                                <CustomImage src={rev.img} alt={rev.name} width={150} height={150}/>
                                <h3>{rev.name}</h3>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )) : <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    breakpoints={{
                        1250: {
                            slidesPerView: 4
                        },
                        991: {
                            slidesPerView: 3
                        },
                        768: {
                            slidesPerView: 2.3
                        }
                    }
                    }
                    loop={true}
                    className={s.swiper}
                >
                    {reviews.map(rev => (
                        <SwiperSlide className={s.review} key={rev.id}>
                            <div className={s.imageWrapper}>
                                <CustomImage src={rev.img ? rev.img : '/placeholder_company.png'} alt={rev.name} fill/>
                            </div>
                            <h3>{rev.name}</h3>
                        </SwiperSlide>
                    ))}
                </Swiper>}

            </div>
        </section>
    );
};

export default Reviews;
