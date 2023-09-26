import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as WiIcons from "react-icons/wi";
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className=" bg-zinc-800 text-black w-48 min-h-screen">
            <ul className="p-4">
                <li className="mb-2 bg-white rounded-lg p-3">
                    <Link to="/" className="text-black hover:text-cyan-600 flex font-semibold text-2xl">
                        <FaIcons.FaHome className=' text-2xl my-auto mr-3 ml-4' />
                        Inicio
                    </Link>
                </li>

                <li className="mb-2  bg-white rounded-lg">
                    <Link to="/Estado_clima" className="text-black hover:text-cyan-600 flex font-semibold text-2xl text-center mt-5">
                        <WiIcons.WiDayCloudy className=' text-6xl my-auto' />
                        Estado del clima
                    </Link>
                </li>
            </ul>
        </div>

    )
}

export default Sidebar