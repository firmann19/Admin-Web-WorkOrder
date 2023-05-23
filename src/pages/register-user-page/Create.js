import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../utils/fetch";
import RegisterInput from "../../components/Register-Input/RegisterInput";
import BreadCrumb from "../../components/Breadcrumb";
import {
  fetchListsDepartement,
  fetchListsGroup,
} from "../../redux/lists/actions";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
    posisi: "",
    DepartementId: 0,
    GroupId: 0,
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListsDepartement());
    dispatch(fetchListsGroup());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "DepartementId" || e.target.name === "GroupId") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      roles: form.roles,
      posisi: form.posisi,
      DepartementId: form.DepartementId.value,
      GroupId: form.GroupId.value,
    };

    await postData(`/auth/signup`, payload)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          navigate("/register-page");
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
          textSecound={"User"}
          urlSecound={"/register-page"}
          textThird="Create"
        />
        <div className="m-auto" style={{ width: "50%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center">Form Signup</Card.Title>
            <p className="text-center">Create your account</p>
            <RegisterInput
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
};

export default CreateUser;
