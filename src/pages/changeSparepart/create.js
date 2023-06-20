import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import BreadCrumb from "../../components/Breadcrumb";
import ChangeSparepartInput from "../../components/changeSparepart-Input";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fetch";
import { toast } from "react-toastify";

function CreateChangeSparepart() {
  const navigate = useNavigate();
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

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      userRequestWo: form.userRequestWo,
      departementUser: form.departementUser,
      namaSparepart: form.namaSparepart,
      harga: form.harga,
      jumlahOrder: form.jumlahOrder,
      alasan: form.alasan,
      HeadIT: form.HeadIT,
    };

    await postData(`/changeSparepart`, payload)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
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
      .catch((err) => console.log("ini error", err));
  };
  return (
    <>
      <Navbar />
      <Container md={12}>
        <BreadCrumb
          textSecound={"Work Order"}
          urlSecound={"/work-order-page"}
          textThird="Change Sparepart"
        />
        <div className="m-auto" style={{ width: "50%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5 mb-5">
          <Card.Body>
            <Card.Title className="text-center mb-5">
              Pergantian Sparepart
            </Card.Title>
            <ChangeSparepartInput
              form={form}
              isLoading={isLoading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default CreateChangeSparepart;
