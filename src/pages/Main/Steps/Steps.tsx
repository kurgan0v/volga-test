import s from './Steps.module.scss';
import Image from "next/image";

const Steps = () => {
    return (
        <section className={s.wrapper}>
            <h2 className={s.title}>Как происходит оформление сертификата?</h2>
            <div className={s.steps}>
                <div className={s.step}>
                    <Image className={s.stepImg} src={'/steps/first.svg'} alt={'step'} width={445} height={297}/>
                    <div className={s.stepInfo}>
                        <h3 className={s.stepTitle}>Подготовка к оформлению</h3>
                        <p className={s.stepText}>На этом этапе мы определим перечень необходимых для сертификации документов, выберем
                            подходящий регламент и поможем подготовиться к прохождению сертификации.</p>
                    </div>
                </div>
                <div className={`${s.step} ${s.stepReverse}`}>
                    <Image className={s.stepImg} src={'/steps/second.svg'} alt={'step'} width={489} height={326}/>
                    <div className={s.stepInfo}>
                        <h3 className={s.stepTitle}>Проверка продукции</h3>
                        <p className={s.stepText}>Для проведения испытаний проводится анализ состояния производства (при необходимости) и выбираются образцы продукции для отправки в испытательный центр. По результатам испытаний ИЦ составляет протоколы испытаний.</p>
                    </div>
                </div>
                <div className={s.step}>
                    <Image className={s.stepImg} src={'/steps/third.svg'} alt={'step'} width={445} height={372}/>
                    <div className={s.stepInfo}>
                        <h3 className={s.stepTitle}>Оформление сертификата</h3>
                        <p className={s.stepText}>Перед оформлением сертификата мы проверяем заготовку на ошибки и достоверность, оформляем и вносим сертификат в реестр. После этого вы получаете готовый сертификат.</p>
                    </div>
                </div>
                <Image className={s.circleImg} src={'/circle.png'} alt={'circle'} width={700} height={700}/>
            </div>
        </section>
    );
};

export default Steps;