import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import CardDashboard from "../../components/CardDashboard-Input";
import Table from "../../components/TableActionSecond";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckouts } from "../../redux/checkouts/actions";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-3 mx-auto">
        <CardDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
