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
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd/dist/antd.css';
import UserForm from "./pages/UserForm"; // or 'antd/dist/antd.less'

function App() {
    return (
        <>
            <BrowserRouter>
                <Nav/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login />}/>
                    <Route path={"/adminPanel"} element={<AdminPanel/>}/>
                    <Route path={"/user-form"} element={<UserForm />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
