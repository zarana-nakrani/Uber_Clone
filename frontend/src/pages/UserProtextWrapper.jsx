import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtextWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
      
        if (!token) {
            // If token is not present, redirect to login page
          navigate('/login')
        }
    }, [token])
        
  return <>{children}</>
}

export default UserProtextWrapper
