import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../utils/fetch";
import RegisterInput from "../../components/Register-Input/RegisterInput";
import BreadCrumb from "../../components/Breadcrumb";
import {
  fetchListsDepartement,
  fetchListsGroup,
  fetchListsPosisi,
  fetchListsRoles,
} from "../../redux/lists/actions";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: 0,
    posisiId: 0,
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
    dispatch(fetchListsPosisi());
    dispatch(fetchListsRoles());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (
      e.target.name === "DepartementId" ||
      e.target.name === "GroupId" ||
      e.target.name === "posisiId" ||
      e.target.name === "roles"
    ) {
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
      roles: form.roles.value,
      posisiId: form.posisiId.value,
      DepartementId: form.DepartementId.value,
      GroupId: form.GroupId.value,
    };

    const res = await postData(`/auth/signup`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah user ${res.data.data.name}`
        )
      );
      navigate("/register-page");
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
          textSecound={"User"}
          urlSecound={"/register-page"}
          textThird="Create"
        />
        <div className="m-auto" style={{ width: "60%" }}>
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
