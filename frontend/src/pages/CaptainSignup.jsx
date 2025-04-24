import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CaptainSignup = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password
        })
        setFirstname('');
        setLastname('');
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
        <h3 className="text-base mb-2">What's your name</h3>
        <div className='flex gap-4'>
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
      <p className='text-center'>Already have an account? <Link to='/login' className="text-blue-600">Login here</Link></p>
      </div>
      <div>
        <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
