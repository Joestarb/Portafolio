import React from 'react';
import Nombre from "../Components/weather_api/Nombre";

function Dashboard() {
  return (
    <div>
      <h1 className='m-14 -mb-14 font-semibold  text-4xl text-center'>Bienvenido</h1>
      <Nombre/>
    </div>
  )
}

export default Dashboard