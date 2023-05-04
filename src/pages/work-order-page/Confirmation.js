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

function ConfirmationWO() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    namaBarang: "",
    kodeBarang: "",
    permasalahan: "",
    tindakan: "",
    gantiSparepart: "",
    UserRequestId: 0,
    UserApproveId: 0,
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneGroup = async () => {
    const res = await getData(`/checkout/${id}`);

    setForm({
      ...form,
      namaBarang: res.data.data.getCheckout_ById.namaBarang,
      kodeBarang: res.data.data.getCheckout_ById.kodeBarang,
      permasalahan: res.data.data.getCheckout_ById.permasalahan,
      tindakan: res.data.data.getCheckout_ById.tindakan,
      gantiSparepart: res.data.data.getCheckout_ById.gantiSparepart,
      UserRequestId: res.data.data.getCheckout_ById.UserRequestId,
      UserApproveId: res.data.data.getCheckout_ById.UserApproveId,
    });
  };

  useEffect(() => {
    fetchOneGroup();
  }, []);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      namaBarang: form.namaBarang,
      kodeBarang: form.kodeBarang,
      permasalahan: form.permasalahan,
      tindakan: form.tindakan,
      gantiSparepart: form.gantiSparepart,
      UserRequestId: form.UserRequestId,
      UserApproveId: form.UserApproveId,
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
    <Container md={12}>
      <BreadCrumb
        textSecound={"User"}
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
            form={form}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ConfirmationWO;
