import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import SettingInput from "../../components/Setting-Input/SettingInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData, putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneUser = async () => {
    const res = await getData(`/user/${id}`);

    setForm({
      ...form,
      name: res.data.data.getAll_users.name,
      email: res.data.data.getAll_users.email,
    });
  };

  useEffect(() => {
    fetchOneUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
    };

    const res = await putData(`/user/${id}`, payload);

    if (res.data.data.update_User) {
      dispatch(setNotif(true, "success", "berhasil ubah profile user"));
      navigate("/");
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
    <Container md={12}>
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: "60%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Setting Profile</Card.Title>
          <SettingInput />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SettingsPage;
