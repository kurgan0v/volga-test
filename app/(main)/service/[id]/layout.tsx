import { Metadata } from "next";

type Props = {
    params: { id: string };
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    return await fetch(`${process.env.API}/seo/service/${params.id??''}`).then((res) => res.json());
}

export default function Meta({
                                 children,
                             }: {
    children: React.ReactNode
}){
    return children
}