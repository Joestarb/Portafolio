import React from 'react';
import CondicionAtmosferica from "../Components/weather_api/CondicionAtmosferica";

function Estado_Clima() {
  return (
    <>
    <div className=' overflow-auto'>
    <CondicionAtmosferica/>
    </div>
    </>
  )
}

export default Estado_Clima