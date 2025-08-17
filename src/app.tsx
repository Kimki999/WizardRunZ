import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Provider from "./context/provider";
import Game from "./pages/game";
import Score from "./pages/score";

export default function App() {
    return (
        <Provider>
            
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Home/>}/>
                    <Route path="play" element={<Game/>}/>
                    <Route path="score" element={<Score is_showing={false}/>}/> 
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
