import Image from "next/image";
import {ImageProps} from "next/dist/shared/lib/get-img-props";

const CustomImage = (props:ImageProps) => {
    const propsNew = {...props}
    propsNew.src = `${process.env.NEXT_PUBLIC_API}/files/${propsNew.src}`;
    propsNew.style = {objectFit: "contain"};
    return (
        <Image {...propsNew}/>
    );
};

export default CustomImage;