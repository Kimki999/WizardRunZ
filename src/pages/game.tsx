import { useEffect, useRef, useState } from "react";
import Board from "../components/board/board";
import { countDusty } from "../lib/general";
import { GameControl } from "../interface/game";
import { board } from "../template/board";
import Timer from "../components/timer/timer";
import ScoreCounter from "../components/score counter/scoreCounter";
import { useAsset } from "../hook/asset";
import { useGameState } from "../hook/game";
import control from "../asset/button_animation.gif"
import { useLocation } from "react-router-dom";

type characterProp = {
    selectNum: number;
}

export default function Game() {
    const [stage, setStage] = useState<number>(0);
    const [gameControl, setGameControl] = useState<GameControl>(board[stage]);
    const { popup } = useAsset();
    const { name } = useGameState();
    const audioRef1 = useRef<HTMLAudioElement>(null);

    // ส่งข้อมูลระหว่างหน้า
    const location = useLocation(); 
    const select = location.state as characterProp;

    if (name==="") window.location.href = "/"

    function onKeyPress(event:KeyboardEvent) {
        let toAddX = 0, toAddY = 0;
        if (event.key === "ArrowUp" || event.key === "w") {
            toAddY = -1;
        } else if (event.key === "ArrowDown" || event.key === "s") {
            toAddY = 1;
        } else if (event.key === "ArrowLeft" || event.key === "a") {
            toAddX = -1;
        } else if (event.key === "ArrowRight" || event.key === "d") {
            toAddX = 1;
        } else {
            return;
        }
        setGameControl(({catPosition, boardTemplate ,EMheight,EMwidth}) => {
            const [x, y] = catPosition;
            let px = x, py = y;
            let cx = x, cy = y;
            let newBoard = [...boardTemplate];
            let high = EMheight;
            let width = EMwidth;
            
            while (px >= 0 && px < newBoard[0].length&& py >= 0 && py < newBoard.length) {
                if (newBoard[py][px] >= 2) {
                    break;
                }
                if (newBoard[py][px] === 1) {
                    newBoard[py][px] = 0;
                }
                cx = px;
                cy = py;
                px+=toAddX;
                py+=toAddY;
            }

            return {catPosition: [cx, cy], boardTemplate: newBoard ,EMheight: high, EMwidth: width};
        });

    }

    useEffect(()=>{
        if (audioRef1.current) audioRef1.current.play();
        window.addEventListener("keydown", onKeyPress);
        return () => {
            if (audioRef1.current) audioRef1.current.pause();
            window.removeEventListener("keydown", onKeyPress);
        };
    }, []);
    
    useEffect(()=>{
        if (countDusty(gameControl.boardTemplate) === 0) {
            setTimeout(()=>{
                const next_stage = Math.min(stage+1, board.length-1);
                setGameControl(board[next_stage]);
                setStage(()=>next_stage);
            },500);
        }
    }, [gameControl]);

    useEffect(() => {
        if (location.pathname === "/play") {
            setStage(0); // reset ทุกครั้งที่เข้าหน้า /play
        }
    }, [location]);

    useEffect(() => {
        resetBoard();
    }, [stage]);

    function resetBoard() {
        const freshBoard = JSON.parse(JSON.stringify(board[stage]));
        setGameControl(freshBoard);
    }

    function onTimeout() {
        window.removeEventListener("keydown", onKeyPress);
        setStage((prev)=>{
            const score_list_json = localStorage.getItem("competitive") || "[]";
            const score_list:{name: string, score: number}[] = JSON.parse(score_list_json);
            let have = false;
            let new_score_list = score_list.map(s_l=>{
                if (s_l.name===name) {
                    have = true;
                    return { ...s_l, score: Math.max(s_l.score, prev) };
                }
                return s_l;
            });
            
            console.log(prev);
            if (!have) {
                new_score_list.push({ name: name, score: prev });
            }

            const sorted = new_score_list.sort((a, b)=>b.score-a.score);
            localStorage.setItem("competitive", JSON.stringify(sorted));
            popup.open(false);        
            return prev;
        })
    }

    return (<div className="w-full min-h-screen flex items-center justify-center flex-col">
        <audio ref={audioRef1} loop>
            <source src="/run.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>

        <div className="absolute top-8 grid grid-cols-2 gap-2">
            <div>
                <Timer className="" time={60} onTimeout={onTimeout}/>
            </div>
            <div>
                <ScoreCounter score={stage} className=""/>
            </div>
        </div>
        
        <Board  array2D={gameControl.boardTemplate} 
                catPositionXY={gameControl.catPosition}
                chooseCharacter={select.selectNum}
                EMheight={gameControl.EMheight}
                EMwidth={gameControl.EMwidth}
        /> 
        {/* <img className="absolute left-24 h-auto w-56" src={control} alt="" />
        <img className="absolute right-24 h-auto w-56" src={control} alt="" /> */}
    </div>);
}
