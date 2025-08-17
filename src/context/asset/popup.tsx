import { createContext, useState } from "react";
import { type Children } from "../../interface/general";
import Score from "../../pages/score";

type Context = {
    open: (is_showing:boolean)=>void
    close: ()=>void
}

export const PopupContext = createContext<Context>({ open: ()=>{}, close: ()=>{} });

export default function PopUPProvider({ children }:Children) {
    const [status, setStatus] = useState<boolean>(false);
    const [isShowing, setIsShowing] = useState<boolean>(false);
    
    function open(is_showing:boolean) {
        setStatus(()=>true);
        setIsShowing(is_showing);
    }

    function close() {
        // set to default
        setStatus(()=>false);
    }
    
    return (<PopupContext.Provider value={{ open, close }}>
        {/* show popup */}
        { status && <div className="fixed w-full h-screen z-30 bg-black/50">
            {/* popup window */}
            <Score is_showing={isShowing}/>
        </div>}

        {/* element in page */}
        {children}
    </PopupContext.Provider>);
}
