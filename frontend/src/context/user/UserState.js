import React, {useState} from 'react';
import UserContext from "./userContext";
import {USER_STATUS} from "../../constants/variables";

const UserState = (props) => {
    const [userStatus,setUserStatus] = useState(USER_STATUS.CHECKING);

    return (
        <UserContext.Provider value={{userStatus:userStatus,setUserStatus:setUserStatus}}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;