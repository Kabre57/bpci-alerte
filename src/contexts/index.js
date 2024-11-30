import React from "react"
export const RootUserContext = React.createContext({})

export const RootUserContextProvider = ({ children }) => {
    const [user, setUser] = React.useState({})

    return <RootUserContext.Provider value={{ user, setUser }}>
        {children}
    </RootUserContext.Provider>
}
