"use client"
import './antd.css';
import s from './FormBlock.module.scss';
import Image from "next/image";
import {Form, Input, message} from "antd";
import ButtonCustom from "@/UI/Button/Button";
import {MaskedInput} from "antd-mask-input";
import {TextMain} from "@/types/main";
import AnimateWrapper from "@/components/AnimateWrapper/AnimateWrapper";
import {useMutation} from "react-query";
import {api} from "@/components/QueryProvider/QueryProvider";
interface FirstProps{
    texts: TextMain[]
    from: string
    isModal?: boolean
}
interface FormData {
    name: string
    phone: string
    from: string
}
const FormBlock = ({texts, from, isModal}: FirstProps) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const mutation = useMutation({
        mutationFn: (values: FormData) => {
            values.from = from;
            return api.post('/form', values)
        },
        onSuccess: ()=>{
            messageApi.open({
                type: 'success',
                content: 'Форма успешно отправлена! Мы свяжемся с вами в ближайшее время',
            });
            form.resetFields();
        },
        onError: () => {
            messageApi.open({
                type: 'error',
                content: 'При отправке формы возникла ошибка',
            });
        }
    })
    const onFinish = (values: FormData) => {
        mutation.mutate(values)
    }

    return (

        <AnimateWrapper>
            {contextHolder}
            <div className={`formBlock ${s.whiteWrapper} ${isModal ? s.wrapperModal : ""}`} >
                <section className={s.wrapper}>
                    <div className={s.wrapTitle}>
                        <h2 className={s.title}>{texts?.find(t => t.name === "title")?.value}</h2>
                        <p>{texts?.find(t => t.name === "text")?.value}</p>
                    </div>
                    <div className={s.form}>
                        <Form
                            form={form}
                            name={from}
                            layout={'vertical'}
                            onFinish={onFinish}
                        >
                            <Form.Item name={"name"} label={'Ваше имя'} rules={[{ required: true, message: 'Это обязательное поле!' }]}>
                                <Input placeholder={"Иван"}/>
                            </Form.Item>
                            <Form.Item name={"phone"} label={"Ваш телефон"} rules={[{ required: true, message: 'Это обязательное поле!' }]}>
                                <MaskedInput
                                    mask={
                                        '+7(000)000-00-00'
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <ButtonCustom htmlType="submit">Рассчитать стоимость</ButtonCustom>
                            </Form.Item>
                        </Form>
                    </div>
                    <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
                </section>
            </div>
        </AnimateWrapper>
    );
};

export default FormBlock;