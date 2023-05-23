/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
//import LogoHTA from "../assets/image/logo-hta.png";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large pt-3"></i>}>
        <div className="flex">
          {/*<img src={LogoHTA} height="50" width="50" /> */}
          <a
            href="/"
            className="text-decoration-none pt-3 ms-3"
            style={{ color: "inherit" }}
          >
            Work Order
          </a>
        </div>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink exact to="/dashboard" activeClassName="activeClicked">
            <CDBSidebarMenuItem className="sidebar" icon="home">
              Dashboard
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            exact
            to="/history-order-page"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem className="sidebar" icon="history">
              History Order
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/profile-setting" activeClassName="activeClicked">
            <CDBSidebarMenuItem className="sidebar" icon="gamepad">
              Profile Setting
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            onClick={() => handleLogout()}
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem className="sidebar" icon="gamepad">
              Log Out
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default Sidebar;
