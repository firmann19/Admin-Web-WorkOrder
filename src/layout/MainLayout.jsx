/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./main-layout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import NavbarItem from "../components/navbar";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      let { user } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setUser(user);
    };
    fetchData();
  })

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
