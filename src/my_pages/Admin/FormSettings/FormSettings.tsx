"use client";
import s from './FormSettings.module.scss';
import {TextMain} from "@/types/main";
import {Form, Input, message} from "antd";
import EditLinks from "@/UI/EditLinks/EditLinks";
import {MaskedInput} from "antd-mask-input";
import ButtonCustom from "@/UI/Button/Button";
import {api} from "@/components/QueryProvider/QueryProvider";
import {Dict} from "@/types/admin";

interface Link{
    id: string
    name: string
    link: string
    type: string
}
export interface Settings{
    email: {
        name: string
    }
    address: {
        name: string
    }
    phones: {
        phone: string
    }
    check: {
        main: TextMain[]
        form: TextMain[]
    }
    seo: {
        meta_main: Dict[],
        meta_check: Dict[]
    }
    links: Link[]
}
const FormSettings = ({settings}:{settings: Settings}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const saveChanges = (values: any)=>{
        api.post('/settings/update', values, {
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
        <div className={s.form}>
            {contextHolder}
            <Form
                layout={'vertical'}
                onFinish={saveChanges}
                initialValues={settings ? {
                    "address": settings.address.name,
                    "phone" : settings.phones.phone,
                    "email" :settings.email.name,
                    "check.main.title": settings.check.main.find(t => t.name === "title")?.value,
                    "check.main.text": settings.check.main.find(t => t.name === "text")?.value,
                    "check.form.title": settings.check.form.find(t => t.name === "title")?.value,
                    "meta_main.title": settings.seo.meta_main.find(t => t.name === "title")?.value,
                    "meta_main.description": settings.seo.meta_main.find(t => t.name === "description")?.value,
                    "meta_main.keywords": settings.seo.meta_main.find(t => t.name === "keywords")?.value,
                    "meta_check.title": settings.seo.meta_check.find(t => t.name === "title")?.value,
                    "meta_check.description": settings.seo.meta_check.find(t => t.name === "description")?.value,
                    "meta_check.keywords": settings.seo.meta_check.find(t => t.name === "keywords")?.value
                } : {}}
            >
                <h2>SEO</h2>
                <div className={s.formWrapper}>

                    <div>

                        <Form.Item name={"meta_main.title"} label={"Title на главной"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"meta_main.description"} label={"Description на главной"}>
                            <Input.TextArea rows={4}/>
                        </Form.Item>
                        <Form.Item name={"meta_main.keywords"} label={"Keywords на главной"}>
                            <Input.TextArea rows={3}/>
                        </Form.Item>

                    </div>
                    <div>
                        <Form.Item name={"meta_check.title"} label={"Title на странице проверки"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"meta_check.description"} label={"Description на странице проверки"}>
                            <Input.TextArea rows={4}/>
                        </Form.Item>
                        <Form.Item name={"meta_check.keywords"} label={"Keywords на странице проверки"}>
                            <Input.TextArea rows={3}/>
                        </Form.Item>
                    </div>
                </div>
                <h2>Настройки</h2>
                <div className={s.formWrapper}>

                    <div>
                        <Form.Item name={"email"} label={"Email"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"address"} label={"Адрес"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"phone"} label={"Телефон"}>
                            <MaskedInput
                                mask={
                                    '+7(000)000-00-00'
                                }/>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name={"check.main.title"} label={"Заголовок на странице проверки"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"check.main.text"} label={"Текст на странице проверки"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={"check.form.title"} label={"Заголовок формы на странице проверки"}>
                            <Input/>
                        </Form.Item>
                    </div>


                </div>
                <Form.Item>
                    <ButtonCustom htmlType="submit">Сохранить</ButtonCustom>
                </Form.Item>
            </Form>
            <h2 className={s.title}>Проверка документов</h2>
            <EditLinks links={settings.links} type={"check"}/>
        </div>
    );
};

export default FormSettings;