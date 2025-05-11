import React from 'react'
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'

const Welcome = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const confirmedRideRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: '78%',
          padding: 10,
        })
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        })
      } else {
        gsap.to(panelRef.current, {
          height: '0%',
          padding: 0,
        })
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        })
      }
    },
    [panelOpen]
  )

  useGSAP(function (){
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        translateY: '0%',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        translateY: '100%',
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(function (){
    if (confirmedRidePanel) {
      gsap.to(confirmedRideRef.current, {
        translateY: '0%',
      })
    } else {
      gsap.to(confirmedRideRef.current, {
        translateY: '100%',
      })
    }
  }, [confirmedRidePanel])

  useGSAP(function (){
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        translateY: '0%',
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        translateY: '100%',
      })
    }
  }, [waitingForDriver])
  return (
    <div className="h-screen relative">
      {/* logo */}
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt=""
      />
      {/* Background image */}
      <div  className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://img.sfist.com/assets_c/2015/07/ubermapvisuals-thumb-640xauto-905052.png"
          alt=""
        />
      </div>
      {/* Search and location panel */}
      <div className="flex flex-col justify-end h-screen top-0 absolute w-full">
        <div className="bg-white relative h-[22%] p-5">
          <h5
            onClick={() => {
              setPanelOpen(false)
            }}
            ref={panelCloseRef}
            className="absolute opacity-0 top-6 right-5 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e)
            }}
          >
            <div className="line absolute h-17 w-1 top-[46%] left-[10%] bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className="bg-[#eee] px-12 py-3 text-base w-full mt-5 rounded-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className="bg-[#eee] px-12 py-3 text-base w-full mt-3 rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white p-0">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>
      </div>
      {/* Vehicle panel */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6'>
        <VehiclePanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} setConfirmedRidePanel={setConfirmedRidePanel}/>
      </div>
      {/* Confirmed Ride Panel */}
      <div ref={confirmedRideRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6'>
        <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel}/>
      </div>
      {/* Waiting for driver */}
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6'>
        <ConfirmedRide setWaitingForDriver={setWaitingForDriver}/>
        </div>
    </div>
  )
}

export default Welcome
