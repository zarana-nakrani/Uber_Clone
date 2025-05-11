import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CaptainContextData } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
const CaptainSignup = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehiclePlateNumber, setVehiclePlateNumber] = useState('')
    const [captain, setCaptain] = useContext(CaptainContextData)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const newCaptain = {
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password,
            vehicle: {
              color: vehicleColor,
              capacity: vehicleCapacity,
              plateNumber: vehiclePlateNumber,
              vehicleType: vehicleType,
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)

        if(response.status === 201){
          setCaptain(response.data.captain)
          localStorage.setItem('captain-token', response.data.token)
          navigate('/welcome')
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setVehicleType('');
        setVehicleColor('');
        setVehicleCapacity('');
        setVehiclePlateNumber('');
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

        <h3 className="text-base mb-2 mt-2">Vehicle Information</h3>
        <div className='flex gap-4'>
        <select
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="bg-[#eeeeee] w-1/2 rounded py-2 px-5 border-transparent text-base placeholder:text-sm"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>
          <input
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border-transparent text-base placeholder:text-sm"
            type="text"
            placeholder="Vehicle Color"
          />
          </div>
          <div className='flex gap-4'>
          <input
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className="bg-[#eeeeee] mb-6 w-1/2 rounded px-4 py-2 border-transparent text-base placeholder:text-sm"
            type="Number"
            placeholder="Vehicle Capacity"
          />
          <input
            required
            value={vehiclePlateNumber}
            onChange={(e) => setVehiclePlateNumber(e.target.value)}
            className="bg-[#eeeeee] mb-6 w-1/2 rounded px-4 py-2 border-transparent text-base placeholder:text-sm"
            type="text"
            placeholder="Vehicle Plate Number"
          />
        </div>

          
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
