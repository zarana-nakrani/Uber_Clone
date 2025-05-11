import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext, { UserContextData } from '../context/UserContext'

const UserSignup = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContextData)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      role: 'user'
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      setUser(response.data.user)
      localStorage.setItem('token', response.data.token)
      navigate('/welcome')
    }
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >
          <h3 className="text-base mb-2">What's your name</h3>
          <div className="flex gap-4">
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="bg-[#eeeeee] mb-6 w-1/2 rounded px-4 py-2 border-transparent text-base placeholder:text-sm"
              type="text"
              placeholder="First name"
            />
            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="bg-[#eeeeee] mb-6 w-1/2 rounded px-4 py-2 border-transparent text-base placeholder:text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-base mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-transparent w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base mb-2 mt-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-transparent w-full text-base placeholder:text-sm"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-medium mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm">
            Sign up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs leading-tight">
          By proceeding, you consent to get calls, Whatsapp or SMS messages, including by automated
          means, from Uber and its affliates to the number provided{' '}
        </p>
      </div>
    </div>
  )
}

export default UserSignup
