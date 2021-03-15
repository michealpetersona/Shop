import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'

const PasswordBar = () => {
  const authContext = useContext(AuthContext)
  const [authCode, setAuthCode] = useState(authContext.getAuthCode())

  useEffect(() => {
    authContext.setAuthCode(authCode)
  } ,[authCode])
 
  return (
    <div>
      <h3>
      Demo Password: 
      <input onChange={(event) => setAuthCode(event.target.value)} value={authCode}/>
      </h3>
    </div>
  )

}

export default PasswordBar