import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { Routes, Route } from "react-router-dom";
import RegisterUserPage from "./pages/register-user-page/RegisterUserPage";
import WorkOrderPage from "./pages/work-order-page/WorkOrderPage";
import SettingsPage from "./pages/settings-page/SettingsPage";
import Dashboard from "./pages/dashboard-page/Dashboard";
import MainLayout from "./layout/MainLayout";
import { useEffect } from "react";
import { listen } from "./redux/listener";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/settings-page";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from "./pages/register-user-page";


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
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        <Route path="/work-order" element={<WorkOrderPage />} />
        <Route path="/register-user" element={<RegisterPage />} />
        <Route path="/settings-page" element={<SettingPage />} />
      </Route>
    </Routes>
    </>

  );
}

export default App;
