import React, { useEffect, useState } from "react";

function CondicionAtmosferica() {
    const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
    const estadosMx = [
        { id: 1, name: "Aguascalientes" },
        { id: 2, name: "Baja California" },
        { id: 3, name: "Baja California Sur" },
        { id: 4, name: "Campeche" },
        { id: 5, name: "Chiapas" },
        { id: 6, name: "Chihuahua" },
        { id: 7, name: "Ciudad de México" },
        { id: 8, name: "Coahuila" },
        { id: 9, name: "Colima" },
        { id: 10, name: "Durango" },
        { id: 11, name: "Estado de México" },
        { id: 12, name: "Guanajuato" },
        { id: 13, name: "Guerrero" },
        { id: 14, name: "Hidalgo" },
        { id: 15, name: "Jalisco" },
        { id: 16, name: "Michoacán" },
        { id: 17, name: "Morelos" },
        { id: 18, name: "Nayarit" },
        { id: 19, name: "Nuevo León" },
        { id: 20, name: "Oaxaca" },
        { id: 21, name: "Puebla" },
        { id: 22, name: "Querétaro" },
        { id: 23, name: "Quintana Roo" },
        { id: 24, name: "San Luis Potosí" },
        { id: 25, name: "Sinaloa" },
        { id: 26, name: "Sonora" },
        { id: 27, name: "Tabasco" },
        { id: 28, name: "Tamaulipas" },
        { id: 29, name: "Tlaxcala" },
        { id: 30, name: "Veracruz" },
        { id: 31, name: "Yucatán" },
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
        <div className="h-screen bg-blue-300 ">
            <div className="  bg-blue-300 p-10 rounded-xl">

                <h1 className="text-3xl text-center font-semibold mb-4">Estado del Tiempo</h1>
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
                        <h2 className="text-xl font-semibold">Ciudades en {estadoActual}:</h2>
                        <div className="grid grid-cols-3 gap-4"> {/* Ajusta el número de columnas según tus necesidades */}
                            {Array.from(new Set(datos.map((ciudad) => ciudad.name))).map((nombreCiudad) => {
                                const ciudadesConNombre = datos.filter((ciudad) => ciudad.name === nombreCiudad);
                                return (
                                    <div key={nombreCiudad} className="border border-teal-400 rounded-xl bg-blue-400 shadow-xl  p-2"> {/* Aplicar estilo a cada caja */}
                                        <p>Nombre: {nombreCiudad}</p>
                                        <ul>
                                            {ciudadesConNombre.map((ciudad) => (
                                                <li key={ciudad.cityid}>
                                                    <p>Temperatura: {ciudad.tempc}°C</p>
                                                    <p>Clima: {ciudad.skydescriptionlong}</p>
                                                </li>
                                            ))[0]} {/* Tomamos solo el primer elemento */}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}



                <div className="grid grid-cols-1 gap-4">
                    {/* Aquí puedes mostrar otros datos si es necesario */}
                </div>
            </div>
        </div>

    );
}

export default CondicionAtmosferica;