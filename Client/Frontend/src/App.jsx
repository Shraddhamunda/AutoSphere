import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import UsedCars from "./pages/UsedCars";
import TestDrive from "./pages/TestDrive";
import Leads from "./pages/Leads";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes accessible to all authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/used-cars" element={<UsedCars />} />
        </Route>

        {/* BUYER only */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={["BUYER"]} />}>
            <Route path="/test-drive" element={<TestDrive />} />
          </Route>
        </Route>

        {/* SALES_CONSULTANT and ADMIN */}
        <Route element={<ProtectedRoute />}>
          <Route element={
            <RoleBasedRoute allowedRoles={["SALES_CONSULTANT", "ADMIN"]} />
          }>
            <Route path="/leads" element={<Leads />} />
          </Route>
        </Route>

        {/* ADMIN only */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
