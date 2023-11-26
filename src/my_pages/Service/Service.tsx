import s from './Service.module.scss';
import {Service} from "@/types/service";
import CustomImage from "@/components/CustomImage/CustomImage";
import ListWithButton from "@/components/ListWithButton/ListWithButton";
import Lottie from "lottie-react";
import check from "@/lotties/checkDocuments.json";
import documents from "@/lotties/documents.json";
import Image from "next/image";
import AnimateWrapper from "@/components/AnimateWrapper/AnimateWrapper";
interface Props{
    service: Service
}
const Service = ({service}: Props) => {
    return (
        <div className={s.service}>
            <AnimateWrapper>
                <div className={s.serviceTitle}>
                    <div className={s.icon}>
                        {service && service.service_icon?.length ? <CustomImage src={service.service_icon} alt={service.title} width={150} height={150}></CustomImage> : null}
                        {service && service.main_icon?.length ? <CustomImage className={s.backgroundImg} src={service.main_icon} alt={service.main_title ?? ""} width={800} height={400}></CustomImage> : null}
                    </div>
                    <h2 className={s.title}>{service.title}</h2>
                </div>
            </AnimateWrapper>
            <AnimateWrapper>
                <div className={s.whom}>
                    <Lottie animationData={check} style={{width: 400, height: 400}}/>
                    <div className={s.whomInfo}>
                        <h3 className={s.whomTitle}>{service.main_title}</h3>
                        <div>{service.main_text?.split('\n').map((t, i) => (<div key={i}>{t}<br/></div>))}</div>
                    </div>
                </div>
            </AnimateWrapper>
            {service.links?.length ? <AnimateWrapper>
                <div className={s.acts}>
                    <h3>Нормативные акты</h3>
                    <ListWithButton list={service.links}/>
                    <Image className={s.circle} src={'/circleBlur.png'} alt={'circle'} width={570} height={570}/>
                </div>
            </AnimateWrapper> : null}
            {service.documents?.length ? <AnimateWrapper>
                <div className={s.documents}>
                    <Lottie animationData={documents} style={{width: 400, height: 400}} />
                    <div className={s.whomInfo}>
                        <h3 className={s.whomTitle}>Что нужно от вас для оформления?</h3>
                        <ul>
                            {service.documents?.map((doc, i) => (
                                <li key={i}>{doc}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </AnimateWrapper> : null}
        </div>
    );
};

export default Service;