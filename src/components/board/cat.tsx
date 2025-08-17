import Fakeharry from "../../asset/Fakeharry.png";
import Fakehermioni from "../../asset/Fakehermioni.png";
import Fakeron from "../../asset/Fakeron.png";
import muscleKitty from "../../asset/muscleKitty.png"
import fish from "../../asset/fish.png"
import superman from "../../asset/superman.png"
import snape from "../../asset/snape.png"
import tomato from "../../asset/tomato.png"

import style from "./cat.module.css";

type CatProp = {
    posi: [number, number] // [x, y]
    character: number;
}

const arrayOfcharacter = [Fakeharry,Fakehermioni,Fakeron,snape,fish,tomato,muscleKitty,superman];

export default function Cat(prop:CatProp) {
    // console.log(prop.character);

    return (
        <div
            style={{ zIndex: (prop.posi[1]*2)+1, top: prop.posi[1]*80, left: prop.posi[0]*80 }}
            className="absolute max-w-[85px] transition-all duration-500 origin-bottom-left">
            <img
                src={arrayOfcharacter[prop.character]}
                alt=""
                className={`${style.cat} -translate-y-2`}/>
        </div>
    )
}
