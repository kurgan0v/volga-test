"use client";
import React from 'react';
import s from './Button.module.scss';
import {Button} from "antd";

const ButtonCustom = (props:any) => {
    return (
        <Button className={s.btn}>{props.children}</Button>
    );
};

export default ButtonCustom;