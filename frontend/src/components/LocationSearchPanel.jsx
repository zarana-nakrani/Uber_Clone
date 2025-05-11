import React from 'react'

const LocationSearchPanel = (props) => {
  // Sample array of locations
  const locations = ["2810 S Figueroa St, Los Angeles",
    "690 Alameda St, Los Angeles",
    "201 W Washington Blvd, Los Angeles",
    "10207 Lakewood Blvd, Downey",
    "1000 S Broadway, Los Angeles",
  ]
  return (
    <div>
      {locations.map((location, index) => (
        <div onClick={() => {
          props.setVehiclePanelOpen(true)
          props.setPanelOpen(false)
          }} key={index} className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
        <h2 className="bg-[#eee] h-12 w-12 flex items-center justify-center rounded-lg">
          <i className="ri-map-pin-fill text-lg"></i>
        </h2>
        <h4 className="font-medium">{location}</h4>
      </div>
      ))}
      
      {/* <div className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
        <h2 className="bg-[#eee] h-12 w-12 flex items-center justify-center rounded-lg">
          <i className="ri-map-pin-fill text-lg"></i>
        </h2>
        <h4 className="font-medium">24B, Near kapoor Hotel, New Delhi</h4>
      </div> */}
    </div>
  )
}

export default LocationSearchPanel
