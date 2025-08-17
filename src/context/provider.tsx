import LoadProvider from "./asset/load";
import { type Children } from "../interface/general";
import PopUPProvider from "./asset/popup";
import UserProvider from "./game/user";

export default function Provider({ children }:Children) {
    return (<LoadProvider>
    <PopUPProvider>
    <UserProvider>
        {children}
    </UserProvider>
    </PopUPProvider>
    </LoadProvider>);
}