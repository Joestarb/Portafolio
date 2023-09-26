// Dashboard.js
import React from 'react';
import clima from "../assets/weatherApi/bg.jpg";
import CardApi from '../Components/CardApi';

function Dashboard() {
  const teamMembers = [
    { id: 1, name: 'Luis Alberto Gomez Broca' },
    { id: 2, name: 'Arbey Alexis Dzib Hernandez' },
    { id: 3, name: 'Edwin Alejandro Sanchez Fernandez' },
  ];

  const cardsData = [
    {
      id: 1,
      titulo: 'Condiciones atmosfericas',
      descripcion: 'Api del estado del clima.',
      imagen: clima, 
      enlace: "/Estado_clima"
    },
  ];

  return (
    <div className="background min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg bg-opacity-50 backdrop-blur-md rounded drop-shadow-lg">
        <h1 className="text-4xl font-semibold text-center mb-8">Bienvenido</h1>
        <div className="m-4">
          <h2 className="text-2xl font-semibold mb-4">Integrantes del Equipo:</h2>
          <ul>
            {teamMembers.map((member) => (
              <li key={member.id} className="mb-2">
                <strong>{member.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-5 mx-10 mt-20">
        {cardsData.map((card) => (
          <CardApi
            key={card.id}
            titulo={card.titulo}
            descripcion={card.descripcion}
            imagen={card.imagen}
            enlace={card.enlace}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
