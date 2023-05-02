import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { useEffect } from "react";
import { listen } from "./redux/listener";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "../src/pages/dashboard-page";
import WorkOrderPage from "../src/pages/work-order-page";
import RegisterPage from "../src/pages/register-user-page";
import SettingsPage from "../src/pages/settings-page";
import CreateUser from "./pages/register-user-page/Create";

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        {/* <Route> */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/work-order-page" element={<WorkOrderPage />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/settings-page" element={<SettingsPage />} />
          <Route path="/register-page/create-user" element={<CreateUser />} />
        </Route>
       
      </Routes>
    </>
  );
}

export default App;
