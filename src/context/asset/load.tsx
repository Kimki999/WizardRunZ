import { createContext, useState } from "react";

import { type Children } from "../../interface/general";
import Loader from "../../components/load";

type Context = (status:boolean)=>void

export const LoadContext = createContext<Context>(()=>{});

export default function LoadProvider({ children }:Children) {
    const [loadStatus, setLoadStatus] = useState<boolean>(false);
    
    function setLoad(status:boolean) {
        setLoadStatus(status);
    }

    return (
        <LoadContext.Provider value={setLoad}>
            {loadStatus && <div className="w-full h-screen bg-black/50 fixed z-40 flex items-center justify-center">
                <Loader/>
            </div>}
            {children}
        </LoadContext.Provider>
    )
}
