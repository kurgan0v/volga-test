import Wrapper from "@/my_pages/Check/Wrapper/Wrapper";
import {Metadata} from "next";
import {Dict} from "@/types/admin";
export async function generateMetadata(): Promise<Metadata> {
    const meta = await fetch(`${process.env.API}/seo/check`).then((res) => {
        if(res.status === 200){
            return res.json()
        } else {
            return [];
        }
    });
    return {
        keywords: meta.find((el:Dict) => el.name === 'keywords')?.value || '',
        title: meta.find((el:Dict) => el.name === 'title')?.value || '',
        description: meta.find((el:Dict) => el.name === 'description')?.value || '',
    };
}
export default function Home() {
    return (
        <Wrapper/>
    )
}