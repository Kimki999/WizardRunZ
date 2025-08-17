import ChooseCharacter from "../components/chooseCharacter"

import START_BUTTON from "../asset/start.png"
import START_BUTTON_HOVER from "../asset/start2.png";
import SCORE_BUTTON from "../asset/score.png"
import SCORE_BUTTON_HOVER from "../asset/score2.png"
import ImgButton from "../components/button/imgButton";
import { useGameState } from "../hook/game";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsset } from "../hook/asset";

// import style from "./cat.module.css";

export default function Home() {
    const { name, setName } = useGameState()
    // เก็บค่าที่เลือกตัวละคร
    const [ selectCharacter, setselectCharacter ] = useState<number>(0);
    const { popup } = useAsset()
    const navigate = useNavigate();
    
    function onChange(e:ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    return (
        <div className="flex justify-center gap-4 items-center h-screen">
            <div className="flex flex-col gap-4 items-center p-14 bg-black/30 rounded-2xl gap-2">
                <h1 className="pt-2 flex justify-center items-center text-white text-xl underline underline-offset-2">WizardRunZ</h1>
                {/* ส่งฟังก์ชัน setselectCharaacter เพื่อไปเก็บค่าที่เปลี่ยนแปลงจาก component ลูก */}
                <ChooseCharacter chooseNum={setselectCharacter} />
                <h1 className="text-white text-sm">Your Name:</h1>
                <input className="bg-neutral-700/0 outline-none border-b-2 text-center text-white p-2 mb-5" type="text" onChange={onChange} value={name}/>
                {/* ส่งข้อมูลที่เปลี่ยนแปลงแล้วไปยัง page ต่อไปผ่าน navigate */}
                <ImgButton onClick={()=>{navigate("/play", {state:{selectNum:selectCharacter}})}} max_w={200} base={START_BUTTON} hover={START_BUTTON_HOVER}></ImgButton>
                <ImgButton onClick={()=>{popup.open(true)}} max_w={200} base={SCORE_BUTTON} hover={SCORE_BUTTON_HOVER}></ImgButton>
            </div>
        </div>
    );
}
