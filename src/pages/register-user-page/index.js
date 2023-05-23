import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/Button";
import SelectBox from "../../components/selectBox";
import BreadCrumb from "../../components/Breadcrumb";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListsDepartement,
  fetchListsGroup,
} from "../../redux/lists/actions";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import {
  fetchUsers,
  setDepartement,
  setGroup,
} from "../../redux/users/actions";
import SAlert from "../../components/Alert";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const user = useSelector((state) => state.user);
  const lists = useSelector((state) => state.lists);


  useEffect(
    () => {
      dispatch(fetchUsers());
    },
    [dispatch],
    user.DepartementId,
    user.GroupId
  );

  useEffect(() => {
    dispatch(fetchListsDepartement());
    dispatch(fetchListsGroup());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(`/user/${id}`).then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
            navigate("/register-page");
          }
        });
        dispatch(fetchUsers());
      }
    });
  };

  return (
    <>
    <Navbar />
    <Container className="mt-3">
      <Button action={() => navigate("/register-page/create-user")}>
        Tambah
      </Button>
      <BreadCrumb textSecound={"User"} />
      <Row>
      <Col>
          <SearchInput
            
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian Departement"}
            name="category"
            value={user.DepartementId}
            options={lists.departements}
            handleChange={(e) => dispatch(setDepartement(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian Group"}
            name="category"
            value={user.GroupId}
            options={lists.groups}
            handleChange={(e) => dispatch(setGroup(e))}
          />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={user.status}
        thead={["Nama", "Email", "Posisi",  "Departement", "Group", "Role", "Aksi"]}
        data={user.data}
        tbody={["name", "email", "posisi",  "DepartementId", "GroupId", "roles", "Aksi"]}
        editUrl={`/register-page/edit-user`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
    </>
  );
}

export default RegisterPage;
