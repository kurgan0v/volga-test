"use client";
import s from './EditBullets.module.scss';
import CustomImage from "@/components/CustomImage/CustomImage";
import {Bullet} from "@/types/main";
import {Form, Input, Modal, Popconfirm} from "antd";
import {useMutation} from "react-query";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useState} from "react";
import UploadImage from "@/UI/UploadImage/UploadImage";
import {UploadFile} from "antd/es/upload/interface";
import ButtonCustom from "@/UI/Button/Button";
import {QuestionCircleOutlined} from "@ant-design/icons";

interface NewBullet {
    id?: string
    img?: string
    title: string
    subtitle: string
    text: string
    type?: string
    order?: number
}

const EditBullets = ({bullets, type, title, typeElement}: { bullets: any[], type?: string, title: string, typeElement?: string }) => {
    const [form] = Form.useForm();
    const [editBullets, setEditBullets] = useState(bullets);
    const [editing, setEditing] = useState<any>();
    const [modal, setModal] = useState(false);
    const [listImages, setListImages] = useState<UploadFile[]>([]);
    const deleteBullet = useMutation({
        mutationFn: async (id: string) => {
            return api.delete(`/${typeElement}/delete/${id}`, {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(r => {
                setEditBullets(r.data)
            })
        },
    });
    const addOrUpdateBullet = useMutation({
        mutationFn: async (bullet: any) => {
            if (listImages.length) {
                bullet.img = listImages[0].response;
            } else {
                bullet.img = '';
            }
            if(type){
                bullet.type = type;
            }
            if(editing){
                bullet.id = editing.id;
                return api.post(`/${typeElement}`, {bullet} , {
                    headers: {
                        "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(r => {
                    setEditBullets(r.data)
                    setModal(false)
                })
            } else {
                return api.post(`/${typeElement}/new`, {bullet} , {
                    headers: {
                        "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(r => {
                    setEditBullets(r.data)
                    setModal(false)
                })
            }
        }
    })
    return (
        <div className={s.wrap}>
            <div className={s.title}>
                <p>{title}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
                     onClick={() => {
                         setModal(true)
                         setEditing(undefined);
                     }}>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M12.5 23.75C18.7132 23.75 23.75 18.7133 23.75 12.5C23.75 6.2868 18.7133 1.24997 12.5 1.24997C6.2868 1.24997 1.24997 6.2868 1.24997 12.5C1.24997 18.7132 6.2868 23.75 12.5 23.75ZM12.5 25C19.4035 25 25 19.4035 25 12.5C25 5.59639 19.4035 0 12.5 0C5.59639 0 0 5.59639 0 12.5C0 19.4035 5.59639 25 12.5 25Z"
                          fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.5001 12.5C17.5 12.6657 17.4342 12.8247 17.317 12.9419C17.1998 13.0591 17.0408 13.1249 16.8751 13.125H8.12499C7.95923 13.125 7.80026 13.0591 7.68305 12.9419C7.56585 12.8247 7.5 12.6657 7.5 12.5C7.5 12.3342 7.56585 12.1753 7.68305 12.0581C7.80026 11.9408 7.95923 11.875 8.12499 11.875H16.8749C17.0407 11.875 17.1997 11.9409 17.3169 12.0581C17.4341 12.1753 17.5 12.3342 17.5001 12.5Z"
                          fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M12.5 17.5001C12.3342 17.5 12.1753 17.4342 12.0581 17.317C11.9409 17.1998 11.875 17.0408 11.875 16.8751V8.12499C11.875 7.95923 11.9408 7.80026 12.0581 7.68305C12.1753 7.56585 12.3342 7.5 12.5 7.5C12.6657 7.5 12.8247 7.56585 12.9419 7.68305C13.0591 7.80026 13.125 7.95923 13.125 8.12499V16.8749C13.1249 17.0407 13.0591 17.1997 12.9419 17.3169C12.8247 17.4341 12.6657 17.5 12.5 17.5001Z"
                          fill="currentColor"/>
                </svg>
            </div>
            <div className={s.editBullets}>
                {editBullets.map(b => (
                    <div className={s.editBullet} key={b.id}>
                        <div className={s.bulletContent}>
                            {b.img && <CustomImage className={s.img} src={b.img} alt={"Bullet img"} width={50} height={50}/>}
                            <div className={s.content}>
                                {b.name && <p className={s.titleBullet}>{b.name}</p>}
                                {b.title && <p className={s.titleBullet}>{b.title}</p>}
                                {b.subtitle && <p className={s.subtitle}>{b.subtitle}</p>}
                                {b.text && <p className={s.text}>{b.text}</p>}
                            </div>
                        </div>
                        <div className={s.bulletActions} >
                            <svg className={s.action} xmlns="http://www.w3.org/2000/svg" version="1.1" onClick={()=>{
                                setModal(true)
                                setEditing(b);
                                setListImages(b.img ? [{
                                    uid: '-1',
                                    name: b.img,
                                    status: 'done',
                                    url: `${process.env.NEXT_PUBLIC_API}/files/${b.img}`,
                                    response: b.img
                                },] : [])
                                form.setFieldsValue(b)
                            }}
                                 width="512" height="512" x="0" y="0"
                                 viewBox="0 0 64 64">
                                <g>
                                    <path
                                        d="M60.148 8.613c.078-4.03-5.115-6.16-7.919-3.265l-1.9 1.886L27.51 29.875c-.092.11-.16.247-.236.37l-2.883 7.97a1 1 0 0 0 1.276 1.283l8.032-2.861c.138-.052.266-.13.366-.23.005-.003 22.828-22.652 22.832-22.655l1.89-1.875a4.568 4.568 0 0 0 1.361-3.264zM33.66 33.992c-.903-1.655-2.142-2.901-3.7-3.73L51.038 9.349l3.729 3.7L33.66 33.992zm-4.86-2.085c1.378.669 2.436 1.729 3.202 3.211l-5.009 1.785 1.807-4.996zm28.578-21.45-1.191 1.183-3.73-3.701 1.18-1.17c2.502-2.373 6.145 1.17 3.74 3.689z"
                                        fill="currentColor" data-original="#000000" className=""></path>
                                    <path
                                        d="M52.665 20.668a1 1 0 0 0-1 1v32.166c0 2.297-1.887 4.166-4.205 4.166H10.057c-2.319 0-4.205-1.869-4.205-4.166V16.721c0-2.297 1.886-4.165 4.205-4.165h32.16c1.303-.009 1.322-1.984 0-2h-32.16c-3.422 0-6.205 2.765-6.205 6.165v37.113c0 3.4 2.783 6.166 6.205 6.166H47.46c3.422 0 6.205-2.766 6.205-6.166V21.668a1 1 0 0 0-1-1z"
                                        fill="currentColor" data-original="#000000"></path>
                                </g>
                            </svg>
                            <Popconfirm
                                title="Подтвердите действие"
                                description="Вы уверены, что хотите удалить элемент?"
                                onConfirm={() => deleteBullet.mutate(b.id)}
                                okText="Да"
                                cancelText="Отмена"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27"
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

                    </div>
                ))}
            </div>
            <Modal
                open={modal}
                onCancel={() => {
                    setListImages([]);
                    form.resetFields();
                    setModal(false)}
                }
                footer={<></>}
            >
                <Form
                    layout={"vertical"}
                    onFinish={(values)=>addOrUpdateBullet.mutate(values)}
                    form={form}
                >
                    <UploadImage list={listImages} setList={setListImages}/>
                    {typeElement !== "review" ? <><Form.Item name={"order"} label={"Номер по порядку"}>
                        <Input/>
                    </Form.Item>
                        <Form.Item name={"title"} label={"Заголовок"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"subtitle"} label={"Подзаголовок"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"text"} label={"Текст"}>
                            <Input.TextArea/>
                        </Form.Item></> : <Form.Item name={"name"} label={"Название компании"}>
                        <Input/>
                    </Form.Item>}
                    <Form.Item>
                        <ButtonCustom htmlType="submit">Сохранить</ButtonCustom>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EditBullets;
