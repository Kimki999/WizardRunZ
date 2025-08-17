import { useContext } from "react";
import { UserContext } from "../context/game/user";

export function useGameState() {
    return useContext(UserContext);
}