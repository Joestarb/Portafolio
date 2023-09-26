// CardApi.js
import React from 'react';
import { Link } from 'react-router-dom';

const CardApi = ({ titulo, descripcion, imagen, enlace }) => {
    return (
        <div className=" bg-zinc-900 rounded-lg shadow-md p-4 max-w-3xl mx-auto bg-opacity-50 backdrop-blur-md drop-shadow-lg  transform transition-transform hover:scale-110 ">
            <Link to={enlace} rel="noopener noreferrer" className=' hover:'>
                <img
                    src={imagen}
                    alt="Imagen de la tarjeta"
                    className="w-full h-32 object-cover rounded-md"
                />
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold text-white">{titulo}</h2>
                    <p className="text-white">{descripcion}</p>
                </div>
            </Link>

        </div>
    );
};

export default CardApi;
