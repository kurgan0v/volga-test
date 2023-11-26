"use client";
import s from './MainForm.module.scss';
import UploadImage from "@/UI/UploadImage/UploadImage";
import {Main} from "@/types/main";
import {Form, Input, message} from "antd";
import Image from "next/image";
import CustomImage from "@/components/CustomImage/CustomImage";
import EditBullets from "@/UI/EditBullets/EditBullets";
import {useEffect, useState} from "react";
import {UploadFile} from "antd/es/upload/interface";
import ButtonCustom from "@/UI/Button/Button";
import {api} from "@/components/QueryProvider/QueryProvider";

const MainForm = ({data}: {data: Main}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [imagePromo, setImagePromo] = useState<UploadFile[]>(data.imagePromo.value ? [{
        uid: '-1',
        name: data.imagePromo.value,
        status: 'done',
        url: `${process.env.NEXT_PUBLIC_API}/files/${data.imagePromo.value}`,
        response: data.imagePromo.value
    }] : []);
    const saveChanges = (values: any)=>{
        api.post('/main/update', values, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            messageApi.info('Изменения сохранены!');
        }).catch(err => {
            messageApi.info('Ошибка при сохранении изменений');
        })
    }
    return (
        <div>
            <Form
                layout={'vertical'}
                className={s.form}
                onFinish={saveChanges}
                initialValues={{
                    "main.first.title": data.texts.first.find(t => t.name === "title")?.value,
                    "main.first.button": data.texts.first.find(t => t.name === "button")?.value,
                    "main.bullets.title": data.texts.bullets.find(t => t.name === "title")?.value,
                    "main.numbers.title": data.texts.numbers.find(t => t.name === "title")?.value,
                    "main.steps.title": data.texts.steps.find(t => t.name === "title")?.value,
                    "main.form.title": data.texts.form.find(t => t.name === "title")?.value,
                    "main.form.text": data.texts.form.find(t => t.name === "text")?.value,
                    "main.form.button": data.texts.form.find(t => t.name === "button")?.value,
                    "main.promo.title": data.texts.promo.find(t => t.name === "title")?.value,
                    "main.promo.text": data.texts.promo.find(t => t.name === "text")?.value,
                    "main.promo.button": data.texts.promo.find(t => t.name === "button")?.value,
                }}
            >
                <div className={`${s.first}`}>
                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Первый экран</h2>
                        <Form.Item label={"Заголовок"} name={"main.first.title"}>
                            <Input.TextArea rows={3}/>
                        </Form.Item>
                        <Form.Item label={"Текст на кнопке"} name={"main.first.button"}>
                            <Input />
                        </Form.Item>
                        <EditBullets bullets={data.bullets.first} type={"first"} title={"Преимущества"} typeElement={"bullet"}/>
                    </div>
                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Преимущества</h2>
                        <Form.Item label={"Заголовок"} name={"main.bullets.title"}>
                            <Input />
                        </Form.Item>
                        <EditBullets bullets={data.bullets.bullets} type={"bullets"} title={"Выгоды"} typeElement={"bullet"}/>
                    </div>
                </div>
                <div className={`${s.first}`}>

                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Статистика</h2>
                        <Form.Item label={"Заголовок"} name={"main.numbers.title"}>
                            <Input/>
                        </Form.Item>
                        <EditBullets bullets={data.bullets.numbers} type={"numbers"} title={"Статистика"} typeElement={"bullet"}/>
                    </div>
                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Порядок оформления</h2>
                        <Form.Item label={"Заголовок"} name={"main.steps.title"}>
                            <Input />
                        </Form.Item>
                        <EditBullets bullets={data.bullets.steps} type={"steps"} title={"Последовательность шагов"} typeElement={"bullet"}/>
                    </div>
                </div>
                <div className={`${s.block}`}>
                    <h2 className={s.title}>Отзывы</h2>
                    <EditBullets bullets={data.reviews} title={"Отзывы"} typeElement={"review"}/>
                </div>
                <div className={`${s.first}`}>
                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Форма</h2>
                        <Form.Item label={"Заголовок"} name={"main.form.title"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Текст"} name={"main.form.text"}>
                            <Input.TextArea rows={4} value={data.texts.form.find(t => t.name === "text")?.value}/>
                        </Form.Item>
                        <Form.Item label={"Текст на кнопке"} name={"main.form.button"}>
                            <Input value={data.texts.form.find(t => t.name === "button")?.value}/>
                        </Form.Item>
                    </div>
                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Промо</h2>
                        <UploadImage list={imagePromo} setList={setImagePromo}/>
                        <Form.Item label={"Заголовок"} name={"main.promo.title"}>
                            <Input />
                        </Form.Item>
                        <Form.Item label={"Текст"} name={"main.promo.text"}>
                            <Input.TextArea rows={4}/>
                        </Form.Item>
                        <Form.Item label={"Текст на кнопке"} name={"main.promo.button"}>
                            <Input/>
                        </Form.Item>
                    </div>
                </div>
                <Form.Item>
                    <ButtonCustom htmlType={"submit"}>Сохранить</ButtonCustom>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MainForm;