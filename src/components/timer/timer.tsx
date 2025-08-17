import { useEffect, useState } from "react"
import { padZero } from "../../lib/general";

type Prop = {
    className?: string,
    time: number
    onTimeout: ()=>any
}

export default function Timer(prop:Prop) {
    const [timer, setTimer] = useState<number>(prop.time);
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimer((prev)=>{
                if (prev===0) {
                    clearInterval(interval);
                    prop.onTimeout()
                    return 0;
                }
                return prev-1
            })
        }, 1000);

        return ()=>{clearInterval(interval);}
    }, [])

    return (
        <div className={`bg-black/50 p-3 border border-blue-100/70 rounded-2xl text-white text-xl `+(prop.className || "")}>
             {padZero(Math.floor(timer/60), 2)}:{padZero(timer%60, 2)} minutes  
        </div>
    )
}

