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
      name: res.data.data.getUser_ById.name,
      email: res.data.data.getUser_ById.email,
      DepartementId: {
        label: res?.data?.data?.getUser_ById?.Departement.nama,
        target: {
          name: "DepartementId",
          value: res?.data?.data?.getUser_ById?.Departement.id,
        },
        value: res?.data?.data?.getUser_ById?.Departement.id,
      },
      GroupId: {
        label: res?.data?.data?.getUser_ById?.Group.nama,
        target: {
          name: "GroupId",
          value: res?.data?.data?.getUser_ById?.Group.id,
        },
        value: res?.data?.data?.getUser_ById?.Group.id,
      },
      posisiId: {
        label: res?.data?.data?.getUser_ById?.Posisi.jabatan,
        target: {
          name: "posisiId",
          value: res?.data?.data?.getUser_ById?.Posisi.id,
        },
        value: res?.data?.data?.getUser_ById?.Posisi.id,
      },
      roles: {
        label: res?.data?.data?.getUser_ById?.Role.roleEmploye,
        target: {
          name: "RoleId",
          value: res?.data?.data?.getUser_ById?.Role.id,
        },
        value: res?.data?.data?.getUser_ById?.Role.id,
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

    await putData(`/user/${id}`, payload)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(`Berhasil update user`);
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
          textThird="Edit"
        />
        <div className="m-auto" style={{ width: "50%" }}>
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
