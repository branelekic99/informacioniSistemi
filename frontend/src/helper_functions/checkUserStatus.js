import {TOKEN} from "../constants/variables";
import axios from "axios";

export const checkUserStatus = async()=>{
    try{
        const token = localStorage.getItem(TOKEN);
        const user = await axios.get("/get-user",{
            headers: {"Authorization": `Bearer ${token}`}
        });
        return user;
    }catch (err){
        console.log(err);
        return null;
    }
};
