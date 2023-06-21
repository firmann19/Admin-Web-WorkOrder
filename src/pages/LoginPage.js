/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import SAlert from "../components/Alert";
import { userLogin } from "../redux/auth/actions";
import { postData } from "../utils/fetch";
import { Card, Container } from "react-bootstrap";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "danger",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData("/auth/signin", form);

      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.user,
          res.data.data.role,
          res.data.data.idUser,
          res.data.data.getManager,
          res.data.data.getNameManager
        )
      );

      setIsLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? "Internal Server Error",
        type: "danger",
      });
    }
  };

  return (
    <Container md={12} className="my-5">
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Signin</Card.Title>
          <LoginInput
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

export default LoginPage;
