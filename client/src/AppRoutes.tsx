import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portal from './pages/Portal';


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/portal" element={<Portal />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
