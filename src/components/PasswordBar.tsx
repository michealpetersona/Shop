import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'

const PasswordBar = () => {
  const authContext = useContext(AuthContext)
 
  return (
    <div>
      <h3>
      Demo Password: 
      <input onChange={(evt) => authContext.setAuthCode(evt.target.value)} value={authContext.authCode}/>
      </h3>
    </div>
  )

}

export default PasswordBar