import Image from "next/image";
import s from './Advantages.module.scss';
import {Bullet, TextMain} from "@/types/main";
import CustomImage from "@/components/CustomImage/CustomImage";
interface FirstProps{
    texts: TextMain[]
    bullets: Bullet[]
}
const Advantages = ({texts, bullets}: FirstProps) => {
    return (
        <div className={s.whiteWrapper}>
            <section className={s.advantagesWrapper}>
                <h2 className={s.title}>{texts?.find(t => t.name === "title")?.value}</h2>
                <div className={s.advantages}>
                    {bullets?.map(b => (
                        <div className={s.advantage} key={b.id}>
                            <div className={s.advantageImg}>
                                <CustomImage src={b.img} alt={b.title} width={70} height={70}/>
                            </div>
                            <div className={s.advantageInfo}>
                                <h3 className={s.advantageTitle}>{b.title}</h3>
                                <p className={s.advantageText}>{b.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
            </section>
        </div>
    );
};

export default Advantages;