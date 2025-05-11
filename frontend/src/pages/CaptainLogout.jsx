import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()
    const captain_token = localStorage.getItem('captain-token')

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            'Authorization': 'Bearer ' + captain_token
,        }
        }
    ).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem('captain-token')
            navigate('/captain-login')
        }
    }).catch((error) => {
        console.log(error)
    })

  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout