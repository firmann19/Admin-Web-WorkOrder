import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/Button";
import SelectBox from "../../components/selectBox";
import BreadCrumb from "../../components/Breadcrumb";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import SAlert from "../../components/Alert";
import { toast } from "react-toastify";
import { fetchCheckouts } from "../../redux/checkouts/actions";

function WorkOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const checkouts = useSelector((state) => state.checkouts);

  useEffect(() => {
    dispatch(fetchCheckouts());
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
        dispatch(fetchCheckouts());
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
        status={checkouts.status}
        thead={[
          "Nama",
          "Nama Peralatan",
          "Kode Peralatan",
          "Permasalahan",
          "Aksi",
        ]}
        data={checkouts.data}
        tbody={[
          "namaBarang",
          "kodeBarang",
          "permasalahan",
          "UserRequestId",
          "Aksi",
        ]}
        editUrl={`/checkout-page/edit-wo`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default WorkOrderPage;
