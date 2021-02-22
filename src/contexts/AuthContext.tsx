import React, { useState, createContext, useEffect } from 'react'

const TOKEN_KEY = 'authCode'

export interface AuthContextType {
  authCode: string
  setAuthCode: (authCode: string) => void
}
const AuthContextStarter: AuthContextType = {
  authCode: '',
  setAuthCode: (authCode: string) => {}
}
const AuthContext = createContext(AuthContextStarter)

export const AuthContextProvider = ({ children }: {children: any}) => {
  const authCodeFromStore: string = window.localStorage.getItem(TOKEN_KEY) || ''
  const storeAuthCode = (authCode: string) => window.localStorage.setItem(TOKEN_KEY, authCode)

  const [authCode, setAuthCode] = useState(authCodeFromStore)

  useEffect(() => {
    storeAuthCode(authCode)
  }, [authCode])

  return (
    <AuthContext.Provider value={{authCode: authCode, setAuthCode: setAuthCode}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext