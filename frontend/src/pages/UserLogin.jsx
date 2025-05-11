import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContextData } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, setUser} = useContext(UserContextData)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser)

        if(response.status === 200){

          const data = response.data;
          setUser(data.user)
          localStorage.setItem('token', data.token)

          navigate('/welcome')
        }

        setEmail('');
        setPassword('');
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
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
      <p className='text-center'>New here? <Link to='/signup' className="text-blue-600">Create new account</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-20 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
