import React, { useEffect, useState } from "react";
import pmNublado from "../../assets/weatherApi/Parcialmente_nublado.png";
import aguaceros from "../../assets/weatherApi/aguaceros.png";
import tdispersas from "../../assets/weatherApi/lluvia.png";
import { default as mmNublado, default as mmnSoleado } from "../../assets/weatherApi/mayormenteSoleado.png";
import niebla from "../../assets/weatherApi/niebla.png";
import nublado from "../../assets/weatherApi/nublado.png";
import Soleado from "../../assets/weatherApi/soleado.png";
import tormentas from "../../assets/weatherApi/tormenta.png";
function CondicionAtmosferica() {
    const weatherIcons = {
        "Parcialmente nublado": pmNublado,
        "Mayormente soleado": mmnSoleado,
        "Mayormente nublado": mmNublado,
        "Nublado": nublado,
        "Soleado": Soleado,
        "Tormentas": tormentas,
        "Tormentas dispersas": tdispersas,
        "Tormentas aisladas": tdispersas,
        "Aguaceros": aguaceros,
        "Niebla": niebla,
        "Algunos aguaceros":aguaceros,
    };

    const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
    const estadosMx = [
        { id: 1, name: "Aguascalientes" },
        { id: 2, name: "Baja California" },
        { id: 3, name: "Baja California Sur" },
        { id: 4, name: "Campeche" },
        { id: 5, name: "Chiapas" },
        { id: 6, name: "Chihuahua" },
        { id: 7, name: "Ciudad de Mexico" },
        { id: 8, name: "Coahuila" },
        { id: 9, name: "Colima" },
        { id: 10, name: "Durango" },
        { id: 11, name: "Estado de Mexico" },
        { id: 12, name: "Guanajuato" },
        { id: 13, name: "Guerrero" },
        { id: 14, name: "Hidalgo" },
        { id: 15, name: "Jalisco" },
        { id: 16, name: "Michoacán" },
        { id: 17, name: "Morelos" },
        { id: 18, name: "Nayarit" },
        { id: 19, name: "Nuevo Leon" },
        { id: 20, name: "Oaxaca" },
        { id: 21, name: "Puebla" },
        { id: 22, name: "Queretaro" },
        { id: 23, name: "Quintana Roo" },
        { id: 24, name: "San Luis Potosi" },
        { id: 25, name: "Sinaloa" },
        { id: 26, name: "Sonora" },
        { id: 27, name: "Tabasco" },
        { id: 28, name: "Tamaulipas" },
        { id: 29, name: "Tlaxcala" },
        { id: 30, name: "Veracruz" },
        { id: 31, name: "Yucatan" },
        { id: 32, name: "Zacatecas" }
    ];

    
    const [datos, setDatos] = useState([]);
    const [estadoActual, setEstadoActual] = useState("Quintana Roo");
    const [climaEstadoActual, setClimaEstadoActual] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const consultarDatos = () => {
        setLoading(true);
        setError(null);

        fetch(`${url}?state=${estadoActual}`)
            .then((res) => {
                if (!res) {
                    throw new Error("La respuesta de la red no fue válida");
                }
                return res.json();
            })
            .then((condicionAtm) => {
                setDatos(condicionAtm.results);
                setClimaEstadoActual(condicionAtm.results[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error al obtener datos. Por favor, inténtalo de nuevo más tarde.");
                setLoading(false);
                console.error("Error al obtener datos:", error);
            });
    };

    useEffect(() => {
        consultarDatos();
    }, [estadoActual]);



    return (
        <div className="h-screen skyImage">
            <div className="p-10 rounded-xl">
                <h1 className="text-3xl text-center font-semibold mb-4">Estado del Tiempo</h1>
                <div className="grid place-content-center mb-4">
                    <label className="mr-2 text-center font-bold">Selecciona un estado:</label>
                    <select
                        className="border px-28 rounded-md p-1"
                        onChange={(e) => setEstadoActual(e.target.value)}
                        value={estadoActual}
                    >
                        <option value="">Selecciona una opción</option>
                        {estadosMx.map((opcion) => (
                            <option key={opcion.id} value={opcion.name}>
                                {opcion.name}
                            </option>
                        ))}
                    </select>
                </div>
                {estadoActual && (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">
                            Estado seleccionado: {estadoActual}
                        </h2>
                    </div>
                )}

                {loading && <p>Cargando...</p>}

                {error && <p className="text-red-500">{error}</p>}

                {datos.length === 0 && !loading && !error && (
                    <p className=" text-center font-bold text-4xl">No se encuentra información.</p>
                )}

                {datos.length > 0 && !loading && !error && (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Ciudades en {estadoActual}:</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {Array.from(new Set(datos.map((ciudad) => ciudad.name))).map((nombreCiudad) => {
                                const ciudadesConNombre = datos.filter((ciudad) => ciudad.name === nombreCiudad);
                                const primeraCiudad = ciudadesConNombre[0];

                                return (
                                    <div key={nombreCiudad} className="border border-teal-400 rounded-xl bgImage shadow-2xl p-2">
                                        <p className="font-bold text-center">{nombreCiudad}</p>
                                        <ul>
                                            <li className="text-white font-semibold " key={primeraCiudad.cityid}>
                                                <p className="text-center">Temperatura: <br /> {primeraCiudad.tempc}°C </p>
                                                <p className="text-center text-black">Clima: {primeraCiudad.skydescriptionlong} </p>
                                                {weatherIcons[primeraCiudad.skydescriptionlong] && (
                                                    <div className="flex justify-center">
                                                        <img
                                                            src={weatherIcons[primeraCiudad.skydescriptionlong]}
                                                            alt={primeraCiudad.skydescriptionlong}
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default CondicionAtmosferica;