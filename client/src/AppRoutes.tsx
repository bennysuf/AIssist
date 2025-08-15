import { Routes, Route } from "react-router-dom";
import Portal from "./pages/Portal";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Inbox from "./pages/Inbox";

const AppRoutes = () => (
  <Routes>
    <Route path="/portal" element={<Portal />} />
    <Route path="/auth/*" element={<Authentication />} />
    <Route path="/inbox" element={<Inbox />} />
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoutes;
