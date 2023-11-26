import s from './Numbers.module.scss';
import Image from "next/image";
import {Bullet, TextMain} from "@/types/main";
interface FirstProps{
    texts: TextMain[]
    bullets: Bullet[]
}
const Numbers = ({texts, bullets}: FirstProps) => {
    return (
        <section className={s.wrapper}>
            <h2 className={s.title}>{texts?.find(t => t.name === "title")?.value}</h2>
            <div className={s.numbers}>
                {bullets && bullets.map(b => (
                    <div className={s.numberInfo} key={b.id}>
                        <h3 className={s.number}>{b.title}</h3>
                        <h4 className={s.numberTitle}>{b.subtitle}</h4>
                        <p className={s.numberText}>{b.text}</p>
                    </div>
                ))}
            </div>
            <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
        </section>
    );
};

export default Numbers;