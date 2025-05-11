import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const CaptainProtectWrapper = ({children}) => {
    const captain_token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    useEffect(() => {
        if(!captain_token) {
            navigate('/captain-login')
        }
    }, [captain_token])
  return (
    <>{children}</>
  )
}

export default CaptainProtectWrapper