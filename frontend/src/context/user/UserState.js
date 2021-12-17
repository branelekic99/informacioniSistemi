import React, {useState} from 'react';
import UserContext from "./userContext";

const UserState = (props) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    return (
        <UserContext.Provider value={{isAuthenticated:isAuthenticated,setIsAuthenticated:setIsAuthenticated}}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;