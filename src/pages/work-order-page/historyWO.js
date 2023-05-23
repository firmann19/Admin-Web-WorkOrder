/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ConfirmWOInput from "../../components/confirmWO-Input";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import BreadCrumb from "../../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getData, postData } from "../../utils/fetch";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchListsHeadIT } from "../../redux/lists/actions";

function HistoryWO() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const { id } = useParams();
  const [form, setForm] = useState({
    namaBarang: "",
    kodeBarang: "",
    permasalahan: "",
    tindakan: "",
    gantiSparepart: "",
    UserRequestId: 0,
    DepartUserId: 0,
    UserApproveId: 0,
    StatusWO: "",
    date_requestWO: "",
    StatusPengerjaan: "",
    HeadITid: 0,
    UserIT: "",
    date_completionWO: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneGroup = async () => {
    const res = await getData(`/checkout/${id}`);

    const resReport = await getData(`/checkoutReport/${id}`);

    setForm({
      ...form,
      namaBarang: res.data.data.getCheckout_ById.namaBarang,
      kodeBarang: res.data.data.getCheckout_ById.kodeBarang,
      permasalahan: res.data.data.getCheckout_ById.permasalahan,
      UserRequestId: res.data.data.getCheckout_ById.UserRequestId,
      UserApproveId: res.data.data.getCheckout_ById.UserApproveId,
      DepartUserId: res.data.data.getCheckout_ById.DepartUserId,
      namaBarang: res.data.data.getCheckout_ById.namaBarang,
      kodeBarang: res.data.data.getCheckout_ById.kodeBarang,
      permasalahan: res.data.data.getCheckout_ById.permasalahan,
      tindakan: resReport.data.data.getAllReport_ById.tindakan,
      gantiSparepart: resReport.data.data.getAllReport_ById.gantiSparepart,
      UserRequestId: res.data.data.getCheckout_ById.UserRequestId,
      DepartUserId: res.data.data.getCheckout_ById.DepartUserId,
      UserApproveId: res.data.data.getCheckout_ById.UserApproveId,
      StatusWO: res.data.data.getCheckout_ById.StatusWO,
      date_requestWO: res.data.getCheckout_ById.date_requestWO,
      StatusPengerjaan: resReport.data.data.getAllReport_ById.StatusPengerjaan,
      HeadITid: resReport.data.data.getAllReport_ById.HeadITid,
      UserIT: resReport.data.data.getAllReport_ById.UserIT,
      date_completionWO:
        resReport.data.data.getAllReport_ById.date_completionWO,
    });
  };

  useEffect(() => {
    dispatch(fetchListsHeadIT());
    fetchOneGroup();
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "HeadITid") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  return (
    <Container md={12}>
      <BreadCrumb
        textSecound={"User"}
        urlSecound={"/work-order-page"}
        textThird="History Order"
      />
      <Card style={{ width: "60%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center mb-5">
            History Work Order
          </Card.Title>
          <ConfirmWOInput form={form} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HistoryWO;
