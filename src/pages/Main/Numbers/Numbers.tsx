import s from './Numbers.module.scss';
import Image from "next/image";
const Numbers = () => {
    return (
        <section className={s.wrapper}>
            <h2 className={s.title}>Почему вы можете быть уверены в результате, обращаясь к нам?</h2>
            <div className={s.numbers}>
                <div className={s.numberInfo}>
                    <h3 className={s.number}>1213</h3>
                    <h4 className={s.numberTitle}>компаний</h4>
                    <p className={s.numberText}>получили сертификат за один день</p>
                </div>
                <div className={s.numberInfo}>
                    <h3 className={s.number}>245</h3>
                    <h4 className={s.numberTitle}>отраслей</h4>
                    <p className={s.numberText}>в которых наши клиенты получили сертификат</p>
                </div>
                <div className={s.numberInfo}>
                    <h3 className={s.number}>0</h3>
                    <h4 className={s.numberTitle}>отказов</h4>
                    <p className={s.numberText}>мы получили по нашим заявкам за последний год</p>
                </div>
            </div>
            <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
        </section>
    );
};

export default Numbers;