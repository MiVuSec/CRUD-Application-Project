import './App.css'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Table } from "./pages/Table.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:table" element={<Table />} />
          <Route path="/:table/:column/:userId" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App