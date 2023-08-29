/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ConfirmWOInput from "../../components/confirmWO-Input";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import BreadCrumb from "../../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getData, putData } from "../../utils/fetch";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListsHeadIT } from "../../redux/lists/actions";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";

function ConfirmationWO() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [getManager, setGetManager] = useState(null);
  const [getNameManager, setGetNameManager] = useState(null);
  const [idUser, setId] = useState(null);
  const lists = useSelector((state) => state.lists);
  const { id } = useParams();
  const [form, setForm] = useState({
    UserRequestId: 0,
    DepartUserId: 0,
    namaBarang: "",
    kodeBarang: "",
    permasalahan: "",
    UserApproveId: "",
    tindakan: "",
    gantiSparepart: "",
    HeadITid: "",
    User_IT: "",
    date_completionWO: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneWO = async () => {
    const res = await getData(`/checkout/${id}`);
    console.log("test", res);

    setForm({
      ...form,
      UserRequestId: res.data.data.userRequest.name,
      DepartUserId: res.data.data.Departement.nama,
      namaBarang: res.data.data.namaBarang,
      kodeBarang: res.data.data.kodeBarang,
      permasalahan: res.data.data.permasalahan,
      UserApproveId: res.data.data.userApprove.name,
    });
  };

  useEffect(() => {
    dispatch(fetchListsHeadIT());
    fetchOneWO();

    const fecthData = () => {
      let { user, idUser, getManager, getNameManager } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setUser(user);
      setId(idUser);
      setGetManager(getManager);
      setGetNameManager(getNameManager)
    };
    fecthData();
  }, [dispatch]);

  const handleChange = async (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      UserRequestId: form.UserRequestId,
      DepartUserId: form.DepartUserId,
      namaBarang: form.namaBarang,
      kodeBarang: form.kodeBarang,
      permasalahan: form.permasalahan,
      UserApproveId: form.UserApproveId,
      tindakan: form.tindakan,
      gantiSparepart: form.gantiSparepart,
      HeadITid: getManager,
      User_IT: idUser,
      date_completionWO: form.date_completionWO,
    };

    const res = await putData(`/checkout/${id}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil konfirmasi Work Order ${res.data.data.userRequest.name}`
        )
      );
      navigate("/work-order-page");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container md={12}>
        <BreadCrumb
          textSecound={"Work Order"}
          urlSecound={"/work-order-page"}
          textThird="Edit"
        />
        <div className="m-auto" style={{ width: "80%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "80%" }} className="m-auto mt-5 mb-5">
          <Card.Body>
            <Card.Title className="text-center mb-5">Work Order</Card.Title>
            <ConfirmWOInput
              user={user}
              getNameManager={getNameManager}
              form={form}
              isLoading={isLoading}
              lists={lists}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ConfirmationWO;
