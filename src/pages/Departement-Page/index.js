import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/Button";
import BreadCrumb from "../../components/Breadcrumb";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { fetchDepartements } from "../../redux/departements/actions";

function DepartementPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departements = useSelector((state) => state.departements);

  useEffect(() => {
    dispatch(fetchDepartements());
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
        await deleteData(`/departement/${id}`).then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
            navigate("/departement-page");
          }
        });
        dispatch(fetchDepartements());
      }
    });
  };

  return (
    <Container className="mt-3">
      <Button action={() => navigate("/departement-page/create-departement")}>
        Tambah
      </Button>
      <BreadCrumb textSecound={"Departement"} />
      <Row>
        <Col md="4">
          <SearchInput />
        </Col>
      </Row>

      <Table
        status={departements.status}
        thead={["Departement", "Aksi"]}
        data={departements.data}
        tbody={["nama", "Aksi"]}
        editUrl={`/departement-page/edit-departement`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default DepartementPage;
