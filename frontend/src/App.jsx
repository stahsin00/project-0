import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import Error from "./pages/Error"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Error />} /> 
        </Routes>
    </BrowserRouter>
  )
}

export default App;
