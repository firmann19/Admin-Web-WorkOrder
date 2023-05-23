import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fetch";
import BreadCrumb from "../../components/Breadcrumb";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import { toast } from "react-toastify";
import GroupInput from "../../components/Group-Input/GroupInput";
import Navbar from "../../components/navbar";

function CreateGroup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
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
      nama: form.nama,
    };

    await postData(`/group`, payload)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          navigate("/group-page");
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
        textSecound={"Group"}
        urlSecound={"/group-page"}
        textThird="Create"
      />
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: "60%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Group</Card.Title>
          <p className="text-center">Create New Group</p>
          <GroupInput
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

export default CreateGroup;
