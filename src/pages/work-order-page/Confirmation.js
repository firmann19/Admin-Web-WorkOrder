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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchListsHeadIT } from "../../redux/lists/actions";
import Navbar from "../../components/navbar";

function ConfirmationWO() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
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
      UserRequestId: res.data.data.getCheckout_ById.userRequest.name,
      DepartUserId: res.data.data.getCheckout_ById.Departement.nama,
      namaBarang: res.data.data.getCheckout_ById.namaBarang,
      kodeBarang: res.data.data.getCheckout_ById.kodeBarang,
      permasalahan: res.data.data.getCheckout_ById.permasalahan,
      UserApproveId: res.data.data.getCheckout_ById.userApprove.name,
      HeadITid: res.data.data.getCheckout_ById.HeadIT.name,
    });
  };

  useEffect(() => {
    dispatch(fetchListsHeadIT());
    fetchOneWO();

    const fecthData = () => {
      let { user, idUser } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setUser(user);
      setId(idUser);
    };
    fecthData();
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "HeadITid") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
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
      HeadITid: form.HeadITid,
      User_IT: idUser,
      date_completionWO: form.date_completionWO,
    };

    await putData(`/checkout/${id}`, payload)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(`Berhasil konfirmasi Work Order`);
          navigate("/work-order-page");
          setIsLoading(false);
        } else {
          setIsLoading(true);
          alert({
            status: false,
            type: "danger",
            message: "gagal",
          });
        }
      })
      .catch((err) => console.log("ini errror", err));
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
        <div className="m-auto" style={{ width: "50%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center mb-5">Work Order</Card.Title>
            <ConfirmWOInput
              user={user}
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
