import { useGSAP } from '@gsap/react'
import React from 'react'
import { useState } from 'react'
import gsap from 'gsap'

const ConfirmedRide = (props) => {
    const vehicleFoundRef = React.useRef(null)
    const [vehicleFound, setVehicleFound] = useState(false)
    
    useGSAP(function () {
        if(vehicleFound){
            gsap.to(vehicleFoundRef.current, {
                display: 'none',
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                display: 'block',
            })
        }
    }, [vehicleFound])

  return (
    <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmedRidePanel(false)
                setVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            {!vehicleFound ?
                <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3> :
                <h3 className='text-2xl font-semibold mb-5'>Looking for a driver</h3>}

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya talav, Ahmedabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-gray-200 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya talav, Ahmedabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹200</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button ref={vehicleFoundRef} onClick={() => {
                    setVehicleFound(true)
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg block'>Confirm</button>
            </div>
        </div>
  )
}

export default ConfirmedRide