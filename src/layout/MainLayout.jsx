import React, { useEffect, useState } from "react";
import "./main-layout.scss";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import NavbarItem from "../components/navbar";

const MainLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { user } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main">
        <NavbarItem user={[user]} />
        <div className="main__content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
