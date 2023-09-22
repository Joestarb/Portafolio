import React, { useEffect, useState } from "react";
import Nombre from "./Nombre";

function CondicionAtmosferica() {
    const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
    const estadosMx = [
        { id: 1, name: "Aguascalientes" },

        { id: 4, name: "Campeche" },
        { id: 5, name: "Chiapas" },
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
                if (!res.ok) {
                    throw new Error("La respuesta de la red no fue válida");
                }
                return res.json();
            })
            .then((condicionAtm) => {
                setDatos(condicionAtm.results);
                // Aquí establecemos el estado climaEstadoActual con la información del clima
                setClimaEstadoActual(condicionAtm.results[0]); // Suponiendo que solo necesitas el primer resultado
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
        <div className="h-screen bg-black ">
            <div className="  bg-blue-300 p-10 rounded-xl">

                <h1 className="text-3xl font-semibold mb-4">Estado del Tiempo</h1>
                <div className="flex items-center mb-4">
                    <label className="mr-2">Selecciona un estado:</label>
                    <select
                        className="border rounded-md p-1"
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

                {datos && !loading && !error && (
                    <div className="mb-4">
                        <h2 className="text-xl grid grid-cols-9 font-semibold">Ciudades en {estadoActual}:</h2>
                        <ul>
                            {Array.from(new Set(datos.map((ciudad) => ciudad.name))).map((nombreCiudad) => {
                                const ciudadesConNombre = datos.filter((ciudad) => ciudad.name === nombreCiudad);
                                return (
                                    <li key={nombreCiudad}>
                                        <p>Nombre: {nombreCiudad}</p>
                                        <ul>
                                            {ciudadesConNombre.map((ciudad) => (
                                                <li key={ciudad.cityid}>
                                                    <p>Temperatura: {ciudad.tempc}°C</p>
                                                    <p>Clima: {ciudad.skydescriptionlong}</p>
                                                </li>
                                            ))[0]} {/* Tomamos solo el primer elemento */}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}


                <div className="grid grid-cols-1 gap-4">
                    {/* Aquí puedes mostrar otros datos si es necesario */}
                </div>
                <Nombre />
            </div>
        </div>

    );
}

export default CondicionAtmosferica;