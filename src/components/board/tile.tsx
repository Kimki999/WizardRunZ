import Purplebook from "../../asset/Purplebook.png";
import Redbook from "../../asset/Redbook.png";
import Pinkbook from "../../asset/Pinkbook.png"
import Skybluebook from "../../asset/Skybluebook.png"
import Beigebook from "../../asset/Beigebook.png"
import Bluebook from "../../asset/Bluebook.png"
import Greenbook from "../../asset/Greenbook.png"
import LightGreenbook from "../../asset/Lightgreenbook.png"
import Orangebook from "../../asset/Orangebook.png"
import Shelf from "../../asset/bookshelf.png";
import { getRandomInt } from "../../lib/general";
import { useState } from "react";

type TileProp = {
    state: number,
    bg: string,
    zIndex: number
}

// list of book
const OBJECT_LIST = [Purplebook,Redbook,Pinkbook,Skybluebook,Beigebook,Bluebook,Greenbook,LightGreenbook,Orangebook]
export default function Tile(prop:TileProp) {
    const [book] = useState(OBJECT_LIST[getRandomInt(0, OBJECT_LIST.length)]);
    
    return (<div className="relative border border-black/10" style={prop.state===3 ? {border: "none"} : { backgroundColor: prop.bg }}>
        {/* book image */}
        <img 
            src={book}
            alt=""
            style={{ zIndex: prop.zIndex*2 }}
            className={`absolute ${prop.state===1 ? "opacity-100" : "opacity-0"} left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 origin-center z-[1] transition-all duration-500 max-w-[60px]`}/>
        { prop.state===2 && <img
            src={Shelf}
            alt=""
            style={{ zIndex: prop.zIndex*2 }}
            className="absolute top-[100%] -translate-y-[100%] w-full"/>}
    </div>);
}
