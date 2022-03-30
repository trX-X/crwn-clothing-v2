import { createContext, useState} from 'react';

// As The actual value we wwant to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
}) 

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const value={currentUser, setCurrentUser}

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}