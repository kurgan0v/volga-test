"use client";
import React, {useState} from "react";
import s from './RequestsList.module.scss';
import './status.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {DatePicker, Form, Input, Modal, Pagination, Popconfirm, Select} from 'antd';
import {RangeValue} from 'rc-picker/lib/interface'
import locale from 'antd/es/date-picker/locale/ru_RU';
import {RangePickerProps} from "antd/es/date-picker";
import {Dict} from "@/types/admin";
import ButtonCustom from "@/UI/Button/Button";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useMutation} from "react-query";
import {api} from "@/components/QueryProvider/QueryProvider";

interface Request {
    id: string
    status: string
    name: string
    phone: string
    from: string
    comment: string
    createdAt: string
    statusInfo: Dict
}

interface RequestsListProps {
    data: {
        requests: Request[],
        totalCount: number
    }
    refetch: any
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    pageSize: number
    setPageSize: React.Dispatch<React.SetStateAction<number>>
    dateRange: RangeValue<dayjs.Dayjs> | undefined
    setDateRange: React.Dispatch<React.SetStateAction<RangeValue<dayjs.Dayjs> | undefined>>
    statuses: Dict[]
    selectedStatuses: string[]
    setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>
}

const {RangePicker} = DatePicker;
const dateFormat = 'DD.MM.YYYY';
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current >= dayjs().endOf('day');
};
const RequestsList = ({
                          data,
                          page,
                          refetch,
                          setPage,
                          setPageSize,
                          pageSize,
                          dateRange,
                          setDateRange,
                          statuses,
                          selectedStatuses,
                          setSelectedStatuses
                      }: RequestsListProps) => {
    const [form] = Form.useForm();
    const [modal, setModal] = useState(false);
    const deleteRequest = useMutation({
        mutationFn: async (id: string) => {
            return api.delete(`/request/delete/${id}`,  {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                },
            }).then(r => {
                refetch()
            })
        },
    });
    const updateRequest = useMutation({
        mutationFn: async (request: any) => {
            return api.post(`/request`, request , {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(r => {
                refetch();
                setModal(false)
            })
        }
    })
    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Заявки</h2>
            <div className={s.filters}>
                <RangePicker
                    locale={locale}
                    format={dateFormat}
                    disabledDate={disabledDate}
                    value={dateRange}
                    onChange={(e) => setDateRange(e)}
                />
                <Select
                    mode={"multiple"}
                    className="original-select"
                    style={{
                        minWidth: 200
                    }}
                    value={selectedStatuses}
                    onChange={setSelectedStatuses}
                    placeholder={"Выберите статус"}
                >
                    {statuses.map((el) => (<Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>))}
                </Select>
            </div>
            <div className={s.requests}>
                {data?.requests.length ? data.requests.map(r => (
                    <div key={r.id} className={s.request}>
                        <p className={s.from}>{r.from}</p>
                        <div className={s.mainInfo}>
                            <div className={s.requestInfo}>
                                <p>{new Date(r.createdAt).toLocaleString()}</p>
                                <div className={s.statusInfo}><p className={r.statusInfo.value}>{r.statusInfo.name}</p>
                                </div>
                                <p>{r.phone}</p>
                                <p>{r.name}</p>
                            </div>
                            <div  className={s.requestActions}>
                                <svg className={s.action} xmlns="http://www.w3.org/2000/svg" version="1.1" onClick={()=>{
                                    setModal(true)
                                    form.setFieldsValue(r)
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
                                    onConfirm={() => deleteRequest.mutate(r.id)}
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
                        <p className={s.from}>{r.comment}</p>
                    </div>
                )) : <p className={s.noData}>Заявки не найдены</p>}
            </div>
            <Modal
                open={modal}
                onCancel={() => {
                    form.resetFields();
                    setModal(false)}
                }
                footer={<></>}
            >
                <Form
                    layout={"vertical"}
                    onFinish={(values)=>updateRequest.mutate(values)}
                    form={form}
                >
                    <Form.Item name={'id'} hidden >
                        <Input />
                    </Form.Item>
                    <Form.Item name={"status"} label={"Статус заявки"}>
                        <Select
                            className="original-select"
                            style={{
                                minWidth: 200
                            }}
                            placeholder={"Выберите статус"}
                        >
                            {statuses.map((el) => (<Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={"comment"} label={"Комментарий"}>
                        <Input.TextArea maxLength={255} showCount/>
                    </Form.Item>
                    <Form.Item>
                        <ButtonCustom htmlType="submit">Сохранить</ButtonCustom>
                    </Form.Item>
                </Form>
            </Modal>
            <Pagination
                current={page}
                total={data.totalCount}
                pageSize={pageSize}
                onChange={setPage}
                showSizeChanger
                pageSizeOptions={[10, 20, 50]}
                onShowSizeChange={(e, s) => {
                    setPageSize(s)
                }}
                hideOnSinglePage
            />
        </div>

    );
};

export default RequestsList;