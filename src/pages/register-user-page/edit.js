/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchListsDepartement,
  fetchListsGroup,
  fetchListsPosisi,
  fetchListsRoles,
} from "../../redux/lists/actions";
import { getData, putData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import BreadCrumb from "../../components/Breadcrumb";
import EditUserInput from "../../components/EditUser-Input/EditUserInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";

function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
    posisiId: "",
    DepartementId: "",
    GroupId: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneUsers = async () => {
    const res = await getData(`/user/${id}`);

    setForm({
      ...form,
      name: res.data.data.name,
      email: res.data.data.email,
      DepartementId: {
        label: res?.data?.data?.Departement.nama,
        target: {
          name: "DepartementId",
          value: res?.data?.data?.Departement.id,
        },
        value: res?.data?.data?.Departement.id,
      },
      GroupId: {
        label: res?.data?.data?.Group.nama,
        target: {
          name: "GroupId",
          value: res?.data?.data?.Group.id,
        },
        value: res?.data?.data?.Group.id,
      },
      posisiId: {
        label: res?.data?.data?.Posisi.jabatan,
        target: {
          name: "posisiId",
          value: res?.data?.data?.Posisi.id,
        },
        value: res?.data?.data?.Posisi.id,
      },
      roles: {
        label: res?.data?.data?.Role.roleEmploye,
        target: {
          name: "RoleId",
          value: res?.data?.data?.Role.id,
        },
        value: res?.data?.data?.Role.id,
      },
    });
  };

  useEffect(() => {
    fetchOneUsers();
  }, []);

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
      console.log("e.target.name");
      console.log(e.target.name);
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
      roles: form.roles.value,
      posisiId: form.posisiId.value,
      DepartementId: form.DepartementId.value,
      GroupId: form.GroupId.value,
    };

    const res = await putData(`/user/${id}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          'berhasil update user'
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
          textThird="Edit"
        />
        <div className="m-auto" style={{ width: "60%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5 mb-5">
          <Card.Body>
            <Card.Title className="text-center">Form Update</Card.Title>
            <p className="text-center">Please update user data </p>
            <EditUserInput
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
}

export default EditUser;
