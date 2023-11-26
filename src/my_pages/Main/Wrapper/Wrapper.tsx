"use client"
import {Main} from "@/types/main";
import {api} from "@/components/QueryProvider/QueryProvider";
import {useQuery} from "react-query";
import AnimateWrapper from "@/components/AnimateWrapper/AnimateWrapper";
import FirstScreen from "@/my_pages/Main/FirstScreen/FirstScreen";
import Advantages from "@/my_pages/Main/Advantages/Advantages";
import Numbers from "@/my_pages/Main/Numbers/Numbers";
import Steps from "@/my_pages/Main/Steps/Steps";
import FormBlock from "@/components/FormBlock/FormBlock";
import Reviews from "@/my_pages/Main/Reviews/Reviews";
import Promotion from "@/my_pages/Main/Promotion/Promotion";
import PageLoader from "@/components/PageLoader/PageLoader";

export default function Wrapper(){
    const getMain = (): Promise<Main> => api.get('/main').then((response) => response.data);
    const {data, isSuccess} = useQuery<Main>(['main'], getMain);
    return (
        <>
            {isSuccess ? <>

                <AnimateWrapper>
                    <FirstScreen texts={data.texts.first} bullets={data.bullets.first}/>
                </AnimateWrapper>
                <AnimateWrapper margin={"100px"}>
                    <Advantages texts={data.texts.bullets} bullets={data.bullets.bullets}/>
                </AnimateWrapper>
                <AnimateWrapper>
                    <Numbers texts={data.texts.numbers} bullets={data.bullets.numbers}/>
                </AnimateWrapper>
                <AnimateWrapper>
                    <Steps texts={data.texts.steps} bullets={data.bullets.steps}/>
                </AnimateWrapper>
                <div id={"form1"}></div>
                <FormBlock texts={data.texts.form} from={"Главная 1 форма"}/>
                <AnimateWrapper>
                    <Reviews texts={data.texts.reviews} reviews={data.reviews}/>
                </AnimateWrapper>
                <AnimateWrapper>
                    <Promotion texts={data.texts.promo} image={data.imagePromo}/>
                </AnimateWrapper>
                <FormBlock texts={data.texts.form} from={"Главная 2 форма"}/>

            </> : <PageLoader/>}
        </>

    )
}