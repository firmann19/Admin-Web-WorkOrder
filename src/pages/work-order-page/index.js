import React, {useEffect} from "react";
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

function WorkOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const checkout = useSelector((state) => state.checkout);
  const lists = useSelector((state) => state.lists);

  useEffect(
    () => {
      dispatch(fetchUsers());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchListsDepartement());
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
    <Container className="mt-3">
      <BreadCrumb textSecound={"Work Order"} />
      <Row>
        <Col>
          <SearchInput />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian Departement"}
            name="category"
            value={""}
            options={""}
            handleChange={""}
          />
        </Col>
      </Row>

      <Table
        status={""}
        thead={[
          "Nama",
          "Departement",
          "Nama Peralatan",
          "Kode Peralatan",
          "Permasalahan",
          "Aksi",
        ]}
        data={""}
        tbody={[
          "name",
          "email",
          "posisi",
          "roles",
          "DepartementId",
          "GroupId",
          "Aksi",
        ]}
        editUrl={`/register-page/edit-user`}
        deleteAction={""}
        withoutPagination
      />
    </Container>
  );
}

export default WorkOrderPage;
