/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import BreadCrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getData } from "../../utils/fetch";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import HistoryChangeInput from "../../components/HistoryChangeSparepart-input";

function HistoryChangeSparepart() {
  const { id } = useParams();
  const [getNameManager, setGetNameManager] = useState(null);
  const [form, setForm] = useState({
    userRequestWo: "",
    departementUser: "",
    namaSparepart: "",
    harga: "",
    jumlahOrder: "",
    alasan: "",
    HeadIT: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const fetchOne = async () => {
    const res = await getData(`/changeSparepart/${id}`);
    console.log("test", res);

    setForm({
      ...form,
      userRequestWo: res.data.data.getChangeSparepart_ById.userRequestWo,
      departementUser: res.data.data.getChangeSparepart_ById.departementUser,
      namaSparepart: res.data.data.getChangeSparepart_ById.namaSparepart,
      harga: res.data.data.getChangeSparepart_ById.harga,
      jumlahOrder: res.data.data.getChangeSparepart_ById.jumlahOrder,
      alasan: res.data.data.getChangeSparepart_ById.alasan,
      HeadIT: res.data.data.getChangeSparepart_ById.HeadIT,
    });
  };

  useEffect(() => {
    const fecthData = () => {
      let { getNameManager } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setGetNameManager(getNameManager)
    };
    fecthData();
    fetchOne();
  }, []);

  return (
    <>
      <Navbar />
      <Container md={12}>
        <BreadCrumb
          textSecound={"Change Sparepart"}
          urlSecound={"/changeSparepart-page"}
          textThird="Detail"
        />
        <div className="m-auto" style={{ width: "50%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center mb-5">Work Order</Card.Title>
            <HistoryChangeInput form={form} getNameManager={getNameManager} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default HistoryChangeSparepart;
