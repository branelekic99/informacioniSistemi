import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./pages/Nav";

function App() {
    return (
        <>
            <BrowserRouter>
                <Nav/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
