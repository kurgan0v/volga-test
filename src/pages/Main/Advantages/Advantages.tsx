import Image from "next/image";
import s from './Advantages.module.scss';
const Advantages = () => {
    return (
        <div className={s.whiteWrapper}>
            <section className={s.advantagesWrapper}>
                <h2 className={s.title}>Поможем оформить сертификат <br/>быстро и легко</h2>
                <div className={s.advantages}>
                    <div className={s.advantage}>
                        <div className={s.advantageImg}>
                            <Image src={'/icons/documents.svg'} alt={'img'} width={70} height={70}/>
                        </div>
                        <div className={s.advantageInfo}>
                            <h3 className={s.advantageTitle}>Берем на себя все заботы</h3>
                            <p className={s.advantageText}>Поможем в подготовке и оформлении всех необходимых дополнительных документов</p>
                        </div>
                    </div>
                    <div className={s.advantage}>
                        <div className={s.advantageImg}>
                            <Image src={'/icons/notification.svg'} alt={'img'} width={70} height={70}/>
                        </div>
                        <div className={s.advantageInfo}>
                            <h3 className={s.advantageTitle}>Вы всегда в курсе дел</h3>
                            <p className={s.advantageText}>Комплексная поддержка на всех этапах оформления: от начала сотрудничества до получения документа</p>
                        </div>
                    </div>
                </div>
                <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
            </section>
        </div>
    );
};

export default Advantages;