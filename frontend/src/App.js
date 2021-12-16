import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./pages/Nav";
import 'antd/dist/antd.css';
import UserForm from "./pages/UserForm"; // or 'antd/dist/antd.less'
import UserState from "./context/user/UserState";

function App() {
    return (
        <>
            <UserState>
                <BrowserRouter>
                    <Nav/>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/user-form"} element={<UserForm/>}/>
                    </Routes>
                </BrowserRouter>
            </UserState>
        </>
    );
}

export default App;
