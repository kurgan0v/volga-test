import FirstScreen from "@/pages/Main/FirstScreen/FirstScreen";
import Advantages from "@/pages/Main/Advantages/Advantages";
import Numbers from "@/pages/Main/Numbers/Numbers";
import Steps from "@/pages/Main/Steps/Steps";
import FormBlock from "@/components/FormBlock/FormBlock";
import Reviews from "@/pages/Main/Reviews/Reviews";
import Promotion from "@/pages/Main/Promotion/Promotion";

export default function Home() {
    return (
        <>
            <FirstScreen/>
            <Advantages/>
            <Numbers/>
            <Steps/>
            <FormBlock />
            <Reviews/>
            <Promotion/>
            <FormBlock />
        </>

    )
}
