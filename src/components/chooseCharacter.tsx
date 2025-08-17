// character
import Fakeharry from "../asset/Fakeharry.png"
import Fakehermioni from "../asset/Fakehermioni.png"
import Fakeron from "../asset/Fakeron.png"
import musclekitty from "../asset/muscleKitty.png"
import fish from "../asset/fish.png"
import superman from "../asset/superman.png"
import snape from "../asset/snape.png"
import tomato from "../asset/tomato.png"

// button
import LEFT_BUTTON from "../asset/leftB.png"
import LEFT_BUTTON_CLICKED from "../asset/clicked-leftB.png"
import RIGHT_BUTTON from "../asset/rightB.png"
import RIGHT_BUTTON_CLICKED from "../asset/clicked-rightB.png"
import ImgButton from "../components/button/imgButton"

import { useState,useEffect } from "react"

// make function for callback value in parent page(home.tsx) to pass that value for
// spawn in game(game.tsx) when they clicked play button
// สร้างฟังก์ชันเพื่อให้ค่ากลับไปที่ page แม่เพื่อส่งค่าตัวละครที่จะ spawn หลังจากกดเล่นเกมแล้ว
type SelectChar = {
    chooseNum: (select:number) => void;
}

// [Fakeharry,snape,fish,tomato,muscleKitty,superman]
const character = [Fakeharry,Fakehermioni,Fakeron,snape,fish,tomato,musclekitty,superman]
export default function chooseCharacter({ chooseNum }: SelectChar ) {
    const [num , setnum] = useState<number>(0); 

    // ส่งค่ากลับทุกครั้งที่ num เปลี่ยนค่า
    useEffect(() => {
        chooseNum(num);
    }, [num]);

    return( <div className="grid grid-cols-5 flex justify-center items-center">
                <div className="col-span-1">
                    <ImgButton onClick={() => {num == 0 ? setnum(character.length-1) : setnum(num - 1)}} max_w={200} base={LEFT_BUTTON} hover={LEFT_BUTTON_CLICKED}></ImgButton>
                </div>
                <div className="col-span-3 flex justify-center items-center">
                    <img src={character[num]} style={{height:180}} alt="" />
                </div>
                <div className="col-span-1">
                    <ImgButton onClick={() => {setnum((num+1)%character.length)}} max_w={200} base={RIGHT_BUTTON} hover={RIGHT_BUTTON_CLICKED}></ImgButton>
                </div>
            </div>

    );
}