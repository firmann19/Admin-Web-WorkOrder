import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import RegisterInput from "../../components/Register-Input/RegisterInput";
import {
  fetchListsDepartement,
  fetchListsGroup,
} from "../../redux/lists/actions";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";

const RegisterUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
    posisi: "",
    DepartementId: "",
    GroupId: "",
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

    const res = await postData("/auth/signup", payload);

    if (res.data.data.registered_user) {
      dispatch(
        setNotif(
          true,
          "success",
          `Register telah dibuat oleh ${res.data.data.name}`
        )
      );
      navigate("/work-order");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: "Register Gagal",
      });
    }
  };

  return (
    <Container md={12}>
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
  );
};

export default RegisterUserPage;
