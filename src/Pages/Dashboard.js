import React from 'react';

function Dashboard() {
  const teamMembers = [
    { id: 1, name: 'Luis Alberto Gomez Broca'},
    { id: 2, name: 'Arbey Alexis Dzib Hernandez'},
    { id: 3, name: 'Edwin Alejandro Sanchez Fernandez'},
  ];

  return (
    <div className="fondo_Dash min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg bg-opacity-50 backdrop-blur-md rounded drop-shadow-lg">
        <h1 className="text-4xl font-semibold text-center mb-8">Bienvenido</h1>
        <div className="m-4">
          <h2 className="text-2xl font-semibold mb-4">Integrantes del Equipo:</h2>
          <ul>
            {teamMembers.map((member) => (
              <li key={member.id} className="mb-2">
                <strong>{member.name}</strong>{member.role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
