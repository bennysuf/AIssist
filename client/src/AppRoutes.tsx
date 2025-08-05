import { Routes, Route } from "react-router-dom";
import Portal from "./pages/Portal";
import Login from "./pages/Login";
import Home from "./pages/Home";


const AppRoutes = () => (
  <Routes>
    <Route path="/portal" element={<Portal />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home/>}/>
  </Routes>
);

export default AppRoutes;
