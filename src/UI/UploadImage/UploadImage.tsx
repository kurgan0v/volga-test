"use client";
import s from './UploadImage.module.scss';
import {Button, Modal, Upload, UploadProps} from "antd";
import {QuestionCircleOutlined, UploadOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {UploadFile} from "antd/es/upload/interface";
import {api} from "@/components/QueryProvider/QueryProvider";
interface Props{
    list: UploadFile[],
    setList: React.Dispatch<React.SetStateAction<UploadFile[]>>
}
const UploadImage = ({list, setList}: Props) => {
    const props: UploadProps = {
        fileList: list,
        listType: "picture-card",
        customRequest: async (options) => {
            const {onSuccess, onError, file, onProgress} = options;
            const formData = new FormData();
            formData.append("file", file);
            api.post('/files', formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                if(onSuccess){
                    onSuccess(res.data.id)
                }
            }).catch(err => {
                if(onError){
                    onError(err);
                }
            })

        },
        onChange: ({ file, fileList, event }) => {
            setList(fileList);
        },
        onRemove: async (file) => {
            const {confirm} = Modal
            return new Promise((resolve, reject) => {
                confirm({
                    title: 'Вы уверены, что хотите удалить изображение?',
                    okText: "Да",
                    cancelText: "Отмена",
                    icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
                    onOk: () => {
                        resolve(true)
                        api.delete(`/files/${file.response}`, {
                            headers: {
                                "Content-type": "multipart/form-data",
                                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        }).then(res => {
                            console.log(res)
                        })
                    },
                    onCancel: () =>{
                        reject(true)
                    }
                })
            })
        }

    };
    return (
        <div>
            <Upload {...props}>
                {list.length >= 1 ? null : <Button icon={<UploadOutlined/>}></Button>}
            </Upload>
        </div>
    );
};

export default UploadImage;