import { useContext } from "react"
import { LoadContext } from "../context/asset/load";
import { PopupContext } from "../context/asset/popup";

export function useAsset() {
    const load = useContext(LoadContext);
    const popup = useContext(PopupContext);
    
    return { load, popup }
}