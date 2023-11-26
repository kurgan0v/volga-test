"use client"
import s from './ListWithButton.module.scss';
import {useState} from "react";
interface Props {
    list: {
        id: string
        name: string
        link: string
    }[]
}
const ListWithButton = ({list}: Props) => {
    const [links, setLinks] = useState(list.slice(0,3));
    return (
        <div className={s.list}>
            <div className={s.linkWrapper}>
                {links && links.map(el => (
                    <a className={s.link} href={el.link} key={el.id} target="_blank">{el.name}</a>
                ))}
            </div>
            {(list.length > 3 && links.length !== list.length) && <button className={s.expand} onClick={()=>setLinks(list)}>Открыть полный список</button>}
        </div>
    );
};

export default ListWithButton;