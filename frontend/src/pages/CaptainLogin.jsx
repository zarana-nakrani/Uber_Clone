import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainContextData } from '../context/CaptainContext'


const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captain, setCaptain] = useContext(CaptainContextData)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

        if(response.status === 200) {
          const data = response.data;
          localStorage.setItem('captain-token', data.token)        
          setCaptain(data.captain)

          navigate('/captain-welcome')
        }

        setEmail('');
        setPassword('');
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
        />
        <form onSubmit={(e) => {submitHandler(e)}}>
          <h3 className="text-xl mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-transparent w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl mb-2 mt-2">Enter Password</h3>
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-transparent w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
      <p className='text-center'>Want to join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a captain</Link></p>
      </div>
      <div>
        <Link to='/login' className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-20 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
