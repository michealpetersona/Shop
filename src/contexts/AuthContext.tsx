import React, { useState, createContext, useEffect } from 'react'

const TOKEN_KEY = 'authCode'

export interface AuthContextType {
  getAuthCode: () => string
  setAuthCode: (authCode: string) => void
}
const AuthContextStarter: AuthContextType = {
  getAuthCode: () => { return ''},
  setAuthCode: (authCode: string) => {}
}
const AuthContext = createContext(AuthContextStarter)

export const AuthContextProvider = ({ children }: {children: any}) => {
  const getAuthCodeFromStore = () => window.localStorage.getItem(TOKEN_KEY) || ''
  const storeAuthCode = (authCode: string) => window.localStorage.setItem(TOKEN_KEY, authCode)

  return (
    <AuthContext.Provider value={{getAuthCode: getAuthCodeFromStore, setAuthCode: storeAuthCode}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext