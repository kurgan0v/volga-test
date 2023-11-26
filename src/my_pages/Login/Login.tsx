"use client";
import {detect} from "detect-browser";
import s from './Login.module.scss';
import {Button, Form, Input, message, Modal, Popconfirm} from "antd";
import {useMutation} from "react-query";
import {api} from "@/components/QueryProvider/QueryProvider";
import ButtonCustom from "@/UI/Button/Button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
import {QuestionCircleOutlined} from "@ant-design/icons";

interface UserData{
    device: string
    browser: string
}
interface Session extends UserData{
    id: string
    createdAt: string
}
export default function Login (){
    const [modal, setModal] = useState(false);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [temporaryToken, setTemporaryToken] = useState('');
    const { push } = useRouter();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [sessionData, setSessionData] = useState<UserData>();
    useEffect(() => {
        const browserInfo = detect();
        setSessionData({
            device: browserInfo?.os ?? "Неизвестное устройство",
            browser: browserInfo?.name ?? "Неизвестный браузер",
        })
    }, []);
    const mutation = useMutation({
        mutationFn: (formData:any) => {
            const loginData = {
                ...formData,
                ...sessionData
            }
            return api.post('/login', loginData).then(r => {
                if(r.data.code === 0){
                    localStorage.setItem('accessToken', r.data.accessToken);
                    push('/admin/main')
                } else {
                    if(r.data.code === 2){
                        setModal(true)
                        setSessions(r.data.sessions);
                        setTemporaryToken(r.data.accessToken)
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: r.data.error,
                        });
                    }
                }
            })
        },
    })
    const onFinish = (values: any) => {
        mutation.mutate(values)
    }
    const deleteSession = useMutation({
        mutationFn: async (id: string) => {
            return api.delete(`/token/delete/${id}`,  {
                headers: {
                    "authorization": `Bearer ${temporaryToken}`
                },
            }).then(r => {
                mutation.mutate(form.getFieldsValue())
            })
        },
    });
    return(
        <div className={s.wrapper}>
            {contextHolder}
            <div className={s.loginForm}>
                <h2 className={s.title}>Авторизация</h2>
                <Form
                    layout="vertical"
                    name="login"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[{ required: true, message: 'Это поле обязательно для заполнения' }]}
                    >
                        <Input placeholder={"login"}/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Это поле обязательно для заполнения' }]}
                    >
                        <Input.Password placeholder={"********"}/>
                    </Form.Item>

                    <Form.Item >
                        <ButtonCustom htmlType="submit" className={s.btnForm}>Войти</ButtonCustom>
                    </Form.Item>
                </Form>
                <Image className={s.circle} src={'/circleBig.png'} alt={'Big circle'} width={1000} height={1000}/>
            </div>
            <Modal
                title={'Превышено количество активных сессий'}
                open={modal}
                footer={<></>}
                onCancel={()=>setModal(false)}
            >
                <p className={s.text}>Для того, чтобы продолжить авторизацию необходимо закрыть одну из активных сессий</p>
                <div className={s.sessions}>
                    {
                        sessions.map((el)=>(
                            <div key={el.id} className={s.session}>
                                <p>{el.device}</p>
                                <p>{el.browser}</p>
                                <p>{new Date(el.createdAt).toLocaleString()}</p>
                                <Popconfirm
                                    title="Подтвердите действие"
                                    description="Вы уверены, что хотите удалить сессию?"
                                    onConfirm={() => deleteSession.mutate(el.id)}
                                    okText="Да"
                                    cancelText="Отмена"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27"
                                         viewBox="0 0 27 27"
                                         fill="none" className={s.action}>
                                        <g clipPath="url(#clip0_155_1381)">
                                            <path
                                                d="M17.6955 9.78198C17.3462 9.78198 17.0631 10.0651 17.0631 10.4143V22.3651C17.0631 22.7141 17.3462 22.9974 17.6955 22.9974C18.0448 22.9974 18.3278 22.7141 18.3278 22.3651V10.4143C18.3278 10.0651 18.0448 9.78198 17.6955 9.78198ZM10.2341 9.78198C9.88489 9.78198 9.60181 10.0651 9.60181 10.4143V22.3651C9.60181 22.7141 9.88489 22.9974 10.2341 22.9974C10.5834 22.9974 10.8664 22.7141 10.8664 22.3651V10.4143C10.8664 10.0651 10.5834 9.78198 10.2341 9.78198Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M4.79587 8.03792V23.6169C4.79587 24.5377 5.13353 25.4024 5.72335 26.0228C6.01378 26.3307 6.36392 26.576 6.75236 26.744C7.14081 26.912 7.55941 26.999 7.98262 26.9998H19.9463C20.3695 26.9991 20.7881 26.9121 21.1766 26.7441C21.5651 26.5761 21.9152 26.3307 22.2056 26.0228C22.7955 25.4024 23.1331 24.5377 23.1331 23.6169V8.03792C24.3056 7.72669 25.0654 6.59396 24.9085 5.39085C24.7514 4.18793 23.7266 3.28814 22.5133 3.28789H19.2759V2.49749C19.2778 2.16845 19.2142 1.84233 19.0889 1.53807C18.9637 1.2338 18.7792 0.95744 18.5463 0.725042C18.3133 0.492667 18.0365 0.308897 17.7319 0.184403C17.4273 0.0599093 17.1009 -0.00282682 16.7719 -0.000162176H11.1571C10.828 -0.00283522 10.5017 0.0598968 10.1971 0.184391C9.89248 0.308885 9.61563 0.492659 9.38263 0.725042C9.1497 0.95744 8.96525 1.2338 8.84 1.53807C8.71474 1.84233 8.65118 2.16845 8.653 2.49749V3.28789H5.41567C4.20238 3.28814 3.17758 4.18793 3.02045 5.39085C2.86363 6.59396 3.62336 7.72669 4.79587 8.03792ZM19.9463 25.7351H7.98268C6.90155 25.7351 6.0605 24.8064 6.0605 23.6169V8.0935H21.8684V23.6169C21.8684 24.8065 21.0274 25.7351 19.9463 25.7351ZM9.91764 2.49749C9.91557 2.33447 9.94628 2.17269 10.0079 2.02177C10.0696 1.87084 10.1609 1.73383 10.2765 1.61889C10.3921 1.50387 10.5296 1.41324 10.6809 1.35236C10.8321 1.29148 10.9941 1.26159 11.1571 1.26447H16.7719C16.9349 1.26159 17.0969 1.29148 17.2481 1.35236C17.3994 1.41324 17.5369 1.50387 17.6525 1.61889C17.7681 1.73383 17.8594 1.87083 17.9211 2.02176C17.9827 2.17269 18.0134 2.33447 18.0113 2.49749V3.28789H9.91764V2.49749ZM5.41567 4.55252H22.5135C23.142 4.55252 23.6516 5.06211 23.6516 5.69069C23.6516 6.31928 23.142 6.82886 22.5135 6.82886H5.4156C4.78702 6.82886 4.27743 6.31928 4.27743 5.69069C4.27743 5.06211 4.78708 4.55252 5.41567 4.55252Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M13.9646 9.78198C13.6154 9.78198 13.3323 10.0651 13.3323 10.4143V22.3651C13.3323 22.7141 13.6154 22.9974 13.9646 22.9974C14.3139 22.9974 14.5969 22.7141 14.5969 22.3651V10.4143C14.5969 10.0651 14.3139 9.78198 13.9646 9.78198Z"
                                                fill="currentColor"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_155_1381">
                                                <rect width="27" height="27" fill="currentColor"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Popconfirm>
                            </div>
                        ))
                    }
                </div>
            </Modal>
        </div>
    )
}