import s from './Steps.module.scss';
import Image from "next/image";
import {Bullet, TextMain} from "@/types/main";
import CustomImage from "@/components/CustomImage/CustomImage";
import AnimateWrapper from "@/components/AnimateWrapper/AnimateWrapper";
interface FirstProps{
    texts: TextMain[]
    bullets: Bullet[]
}
const Steps = ({texts, bullets}: FirstProps) => {
    return (
        <section className={s.wrapper}>
            <h2 className={s.title}>{texts?.find(t => t.name === "title")?.value}</h2>
            <div className={s.steps}>
                {bullets && bullets.map((b,i) => (
                    <AnimateWrapper key={b.id}>
                        <div className={`${s.step} ${i%2 ? s.stepReverse : ""}`}  >
                            <div>
                                <CustomImage className={s.stepImg} src={b.img} alt={'step'} width={400} height={250}/>
                            </div>
                            <div className={s.stepInfo}>
                                <h3 className={s.stepTitle}>{b.title}</h3>
                                <p className={s.stepText}>{b.text}</p>
                            </div>
                        </div>
                    </AnimateWrapper>
                ))}

                <Image className={s.circleImg} src={'/circle.png'} alt={'circle'} width={700} height={700}/>
            </div>
        </section>
    );
};

export default Steps;