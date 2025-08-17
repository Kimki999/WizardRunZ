import { useState } from "react";

type Prop = {
    
    max_w?: number,
    to?: string,
    onClick?: ()=>any
    base: string,
    hover: string
}

export default function ImgButton(prop:Prop) {
    const [imgSrc, setImgSrc] = useState<string>(prop.base);

    function onHover() {
        setImgSrc(prop.hover);
    }

    function onMouseLeave() {
        setImgSrc(prop.base);
    }

    if (prop.to) {
        return <a onMouseOver={onHover} onMouseLeave={onMouseLeave} href={prop.to}>
            <img 
                style={prop.max_w ? { maxWidth: prop.max_w } : undefined}
                src={imgSrc}
                alt=""/>
        </a>
    }
    return (<img
        onMouseOver={onHover} onMouseLeave={onMouseLeave}
        onClick={prop.onClick}
        style={prop.max_w ? { maxWidth: prop.max_w } : undefined}
        className="cursor-pointer"
        src={imgSrc}
        alt=""/>)
}
