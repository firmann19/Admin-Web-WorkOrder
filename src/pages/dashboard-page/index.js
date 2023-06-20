import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import CardDashboard from "../../components/CardDashboard-Input";
import Table from "../../components/TableActionSecond";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckouts } from "../../redux/checkouts/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const checkouts = useSelector((state) => state.checkouts);

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="mt-3 mx-auto">
        <CardDashboard />
      </div>
      <div className="latest-transaction">
        <p className="text-lg fw-bold color-palette-1 mb-14">
          Latest Transactions
        </p>
        <div className="main-content main-content-table overflow-auto">
          <Table
            status={checkouts.status}
            thead={["Peralatan", "Kode", "Status", "Departement", "Nama"]}
            data={checkouts.data}
            tbody={[
              "userName",
              "departmentName",
              "namaBarang",
              "kodeBarang",
              "StatusPengerjaan",
              "Aksi",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
