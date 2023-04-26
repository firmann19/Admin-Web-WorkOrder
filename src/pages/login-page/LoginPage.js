/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../assets/images/login-page.png";
import LoginInput from "../../components/login-input/LoginInput";
import SAlert from "../../components/Alert";
import { userLogin } from "../../redux/auth/actions";
import { postData } from "../../utils/fetch";

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

      dispatch(userLogin(res.data.data.token, res.data.data.user, res.data.data.email, res.data.data.departement));

      setIsLoading(false);
      navigate("/");
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
    <section id="loginPage" className="h-screen">
      <div className="flex flex-col items-center lg:flex-row lg:h-full">
        <div className="w-full self-center p-8 md:h-3/5 lg:w-2/5">
          <div className="m-auto text-center" style={{ width: "100%" }}>
            {alert.status && (
              <SAlert type={alert.type} message={alert.message} />
            )}
          </div>
          <h1 className="font-Philosopher font-bold text-4xl text-danger md:text-6xl lg:text-4xl text-center mb-3">
            Login
          </h1>
          <p className="font-Quicksand mt-2 mb-4 md:text-lg lg:text-base text-center">
            Please Login to continue into the application.
          </p>
          <LoginInput
            form={form}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <p className="text-center font-Quicksand mt-4 md:text-lg lg:text-base">
            Don&apos;t have an account?{" "}
            <Link
              className="underline text-link hover:text-linkHover"
              to="/register-page"
            >
              Register
            </Link>
          </p>
        </div>
        <div className="w-full bg-slate-50 flex items-center md:h-2/5 lg:w-3/5 lg:h-full">
          <div className="inline-block">
            <img
              src={LoginImg}
              alt="login illustration image."
              className="w-3/4 mx-auto p-4 md:w-3/5 md:p-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
