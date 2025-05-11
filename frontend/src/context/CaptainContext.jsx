import React, { useState } from 'react'
import { createContext } from 'react'

export const CaptainContextData = createContext()
const CaptainContext = ({children: children}) => {
    const [captain, setCaptain] = useState({
        fullname: {
            firstName: '',
            lastName: '',
        },
        email:'',
        password: '',
    })
  return (
    <CaptainContextData.Provider value={[captain, setCaptain]}>
        {children}
    </CaptainContextData.Provider>
  )
}

export default CaptainContext