import { useEffect, useState } from "react";
import BUTTON from "../asset/restart.png";
import START_BUTTON from "../asset/home.png";
import START_BUTTON_HOVER from "../asset/home2.png";
import BUTTON_HOVER from "../asset/restart2.png";
import ImgButton from "../components/button/imgButton";

type Prop = {
    is_showing:boolean
}

export default function Score({ is_showing }:Prop) {
    const [statics, setStatics] = useState<{name: string, score: number}[]>([]);

    useEffect(()=>{
        try {
            const score_list_json = localStorage.getItem("competitive") || "[]";
            setStatics(JSON.parse(score_list_json))
        } catch (error) {
            setStatics([]);
        }
    }, []);
    
    return (<>
        <div className={`flex justify-center items-center bg-black/90 h-screen`}>
            <div className="flex flex-col rounded-md items-center border-spacing-2 p-5">
                <h1 className="text-2xl font-medium text-green-400 drop-shadow-[0_2px_2px_rgba(0,0,0)]">☆ Scoreboard ☆</h1>
                <div className="w-[350px] h-[40vh] overflow-y-scroll">
                    <table className="w-full text-white">
                        <tbody>
                            <tr>
                                <th className="border-b-2 p-4 w-[50%] border-white text-lg">Name</th>
                                <th className="border-b-2 p-4 border-white text-lg">Score</th>
                            </tr>
                            {
                                statics.map((s, index)=><tr key={index}>
                                    <td className="py-2">♦ {s.name}</td>
                                    <td className="text-center py-2">{s.score}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <ImgButton 
                    to={is_showing ? undefined : "/play"}
                    onClick={is_showing ? ()=>{window.location.href = "/"} : undefined}
                    max_w={200}
                    base={is_showing ? START_BUTTON : BUTTON}
                    hover={is_showing ? START_BUTTON_HOVER : BUTTON_HOVER}/>
            </div>
        </div>
    </>)
}
