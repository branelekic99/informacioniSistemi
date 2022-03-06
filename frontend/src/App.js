import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./pages/Nav";
import AdminPanel from "./pages/AdminPanel"
import 'antd/dist/antd.css';
import UserForm from "./pages/UserForm";
import SuccessfullySumbited from "./components/SuccessfullySumbited"; // or 'antd/dist/antd.less'
import UserState from "./context/user/UserState";
import Map from "./pages/map/Map";

function App() {
    return (
        <>
            <BrowserRouter>
                <UserState>
                    <Nav/>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/adminPanel"} element={<AdminPanel/>}/>
                        <Route path={"/user-form"} element={<UserForm/>}/>
                        <Route path={"/map"} element={<Map />}/>
                        <Route path={"/user-form-success"} element={<SuccessfullySumbited/>}/>
                    </Routes>
                </UserState>
            </BrowserRouter>
        </>
    );
}

export default App;
