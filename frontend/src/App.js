import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./pages/Nav";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
    return (
        <>
            <BrowserRouter>
                <Nav/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login username={"brane"} password={"neki passsword"} />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
