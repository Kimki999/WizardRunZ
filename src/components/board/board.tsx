import { CSSProperties } from "react";
import Tile from "./tile";
import Cat from "./cat";

type BoardProp = {
    array2D: number[][]
    catPositionXY: [number, number]
    chooseCharacter: number
    EMwidth: number
    EMheight: number
}

export default function Board(prop:BoardProp) {
    // when input []
    if (prop.array2D.length===0) return <div></div>
    
    const grid_col = prop.array2D.length;
    const grid_row = prop.array2D[0].length;
    const boardStyle:CSSProperties = {
        gridTemplateColumns: `repeat(${grid_row}, 80px)`,
        gridTemplateRows: `repeat(${grid_col}, 80px)`
    }

    let color = true;

    return (
        <div>
            <div style={{ height: `${prop.EMheight}px`, width: `${prop.EMwidth}px`}}></div>
            <div className={`grid relative rounded-md`} style={boardStyle}>
            <Cat posi={prop.catPositionXY} character={prop.chooseCharacter}/>
            { prop.array2D.map((row, inx_r)=>{
                let start = color;
                color = !color;
                return row.map((col, inx_c)=>{
                    start = !start;
                    return <Tile zIndex={inx_r} key={(inx_r*row.length)+inx_c} bg={start ? "#b0d2ff" : "#FFF" } state={col}/>
                    // return <Tile zIndex={inx_r} key={(inx_r*row.length)+inx_c} bg={"#b0d3e7"} state={col}/>
                });
            })}
            </div>
        </div>
    );
}