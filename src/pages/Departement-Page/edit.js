/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import BreadCrumb from "../../components/Breadcrumb";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import { toast } from "react-toastify";
import DepartementInput from "../../components/Departement-Input/DepartementInput";

function EditDepartement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nama: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneDepartement = async () => {
    const res = await getData(`/departement/${id}`);

    setForm({
      ...form,
      nama: res.data.data.getDepartement_ById.nama,
    });
  };

  useEffect(() => {
    fetchOneDepartement();
  }, []);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      nama: form.nama,
    };

    await putData(`/departement/${id}`, payload)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(
            `Berhasil update departement`
          );
          navigate("/departement-page");
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
        textSecound={"Departement"}
        urlSecound={"/departement-page"}
        textThird="Edit"
      />
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: "60%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Departement</Card.Title>
          <p className="text-center">Please Update Departement</p>
          <DepartementInput
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

export default EditDepartement;
