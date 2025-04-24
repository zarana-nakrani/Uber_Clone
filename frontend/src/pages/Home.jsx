import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="h-screen bg-[url(https://images.unsplash.com/photo-1563256014-5d7586c22430?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center pt-8 w-full flex flex-col justify-between">
        <img
          className="w-15 ml-8"
          src="https://www.edigitalagency.com.au/wp-content/uploads/Uber-logo-white-png-900x313.png"
          alt="uber-logo"
        />
        <div className="bg-white py-4 pb-21 px-4">
          <h2 className='text-[30px] font-medium'>Get started with Uber</h2>
          <Link to='/login' className='flex items-center justify-center w-full mt-5 py-3 rounded text-xl bg-black text-white'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
