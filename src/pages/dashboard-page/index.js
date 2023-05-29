import React from "react";
import Navbar from "../../components/navbar";
import CardDashboard from "../../components/CardDashboard-Input";

const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <div className="mt-3 mx-auto">
        <CardDashboard/>
        </div>
    </div>
  );
};

export default Dashboard;
