import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import Estado_Clima from "./Pages/Estado_Clima";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          {/* <Sidebar/> */}
          {/* <div className="flex-1"> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Estado_clima" element={<Estado_Clima />} />
            </Routes>
          {/* </div> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
