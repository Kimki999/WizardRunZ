import { createContext, useState } from "react";
import { Children } from "../../interface/general";

type Context = {
    score: number,
    onPass: ()=>void,
    name: string,
    setName: (name:string)=>void
}

const contextInit = {
    score: 0,
    onPass: ()=>{},
    name: "",
    setName: ()=>{}
};

export const UserContext = createContext<Context>(contextInit);

// score that get from pass
export default function UserProvider({ children }:Children) {
    const [score, setScore] = useState<number>(0);
    const [name, setName] = useState<string>("");
    
    function increaseScore() {
        setScore((prev)=>prev+1);
    }

    function setUserName(name: string) {
        setName(()=>name);
    }
    
    return (<UserContext.Provider value={{ score: score, onPass:increaseScore, name: name, setName:setUserName }}>
        {children}
    </UserContext.Provider>);
}
