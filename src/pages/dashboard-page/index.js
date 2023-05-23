import React from "react";
import { Bar } from "react-chartjs-2";
import Box from "../../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
} from "../../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox from "../../components/summary-box/SummaryBox";
import { data } from "../../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../../components/Sidebar";
import NavbarItem from "../../components/navbar";
import Navbar from "../../components/navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <p>Dashboard</p>
    </div>
  );
};

export default Dashboard;
