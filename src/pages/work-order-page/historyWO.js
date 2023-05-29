/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Container } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getData } from "../../utils/fetch";
import { useEffect } from "react";
import HistoryWOInput from "../../components/HistoryWO-Input";
import Navbar from "../../components/navbar";

function HistoryWO() {
  const { id } = useParams();
  const [form, setForm] = useState({
    UserRequestId: 0,
    DepartUserId: 0,
    namaBarang: "",
    kodeBarang: "",
    permasalahan: "",
    UserApproveId: 0,
    date_requestWO: "",
    tindakan: "",
    gantiSparepart: "", 
    HeadITid: 0,
    User_IT: "",
    date_completionWO: ""
  });

  const fetchOneWO = async () => {
    const res = await getData(`/checkout/${id}`);

    setForm({
      ...form,
      UserRequestId: res.data.data.getCheckout_ById.UserRequestId,
      DepartUserId: res.data.data.getCheckout_ById.DepartUserId,
      namaBarang: res.data.data.getCheckout_ById.namaBarang,
      kodeBarang: res.data.data.getCheckout_ById.kodeBarang,
      permasalahan: res.data.data.getCheckout_ById.permasalahan,
      UserApproveId: res.data.data.getCheckout_ById.UserApproveId,
      date_requestWO: res.data.data.getCheckout_ById.date_requestWO,
      tindakan: res.data.data.getCheckout_ById.tindakan,
      gantiSparepart: res.data.data.getCheckout_ById.gantiSparepart, 
      HeadITid: res.data.data.getCheckout_ById.HeadITid,
      User_IT: res.data.data.getCheckout_ById.User_IT,
      date_completionWO: res.data.data.getCheckout_ById.date_completionWO
    });
  };

  useEffect(() => {;
    fetchOneWO();
  }, []);

  return (
    <>
    <Navbar />
    <Container md={12}>
      <BreadCrumb
        textSecound={"User"}
        urlSecound={"/work-order-page"}
        textThird="History Order"
      />
      <Card style={{ width: "60%" }} className="m-auto mt-5 mb-5">
        <Card.Body>
          <Card.Title className="text-center mb-5">
            History Work Order
          </Card.Title>
          <HistoryWOInput form={form} />
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default HistoryWO;
