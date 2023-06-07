import s from './Promotion.module.scss';
import Image from "next/image";
import ButtonCustom from "@/UI/Button/Button";
const Promotion = () => {
    return (
        <section className={s.wrapper}>
            <Image className={s.promotionImg} src={'/ruble.png'} alt={'ruble'} width={380} height={370}/>
            <Image className={s.circle} src={'/circle.png'} alt={'circle'} width={700} height={700}/>
            <div className={s.promotionInfo}>
                <h2 className={s.title}>Возместите до 90% стоимости сертификата с гос. программой</h2>
                <p className={s.text}>Расскажем об условиях получения гос. финансирования и поможем подготовить компанию и документы к подаче заявки</p>
                <ButtonCustom>Оставить заявку</ButtonCustom>
            </div>
        </section>
    );
};

export default Promotion;