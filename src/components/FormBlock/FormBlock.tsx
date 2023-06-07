"use client"
import './antd.css';
import s from './FormBlock.module.scss';
import Image from "next/image";
import {Form, Input} from "antd";
import ButtonCustom from "@/UI/Button/Button";
import {MaskedInput} from "antd-mask-input";
const FormBlock = () => {
    return (
        <div className={s.whiteWrapper}>
            <section className={s.wrapper}>
                <div className={s.wrapTitle}>
                    <h2 className={s.title}>Узнайте стоимость нужного документа</h2>
                    <p>Вы получите бесплатную консультацию и окончательный расчет стоимости документа для вашей продукции и услуги</p>
                </div>
                <div className={s.form}>
                    <Form
                        layout={'vertical'}
                    >
                        <Form.Item name={"name"} label={'Ваше имя'}>
                            <Input placeholder={"Иван"}/>
                        </Form.Item>
                        <Form.Item name={"phone"} label={"Ваш телефон"}>
                            <MaskedInput
                                mask={
                                    //  https://imask.js.org/guide.html#masked-pattern
                                    '+7(000)000-00-00'
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <ButtonCustom>Рассчитать стоимость</ButtonCustom>
                        </Form.Item>
                    </Form>
                </div>
                <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
            </section>
        </div>
    );
};

export default FormBlock;