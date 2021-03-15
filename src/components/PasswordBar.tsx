import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'

const PasswordBar = () => {
  const authContext = useContext(AuthContext)
 
  return (
    <div>
      <h3>
      Demo Password: 
      <input onChange={(event) => authContext.setAuthCode(event.target.value)} value={authContext.authCode}/>
      </h3>
    </div>
  )

}

export default PasswordBar