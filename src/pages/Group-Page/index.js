import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/Button";
import BreadCrumb from "../../components/Breadcrumb";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import SAlert from "../../components/Alert";
import { toast } from "react-toastify";
import { fetchGroups } from "../../redux/groups/actions";

function GroupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const groups = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups());
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
        await deleteData(`/group/${id}`).then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
            navigate("/group-page");
          }
        });
        dispatch(fetchGroups());
      }
    });
  };

  return (
    <Container className="mt-3">
      <Button action={() => navigate("/group-page/create-group")} >Tambah</Button>
      <BreadCrumb textSecound={"Group"} />
      <Row>
        <Col md="4">
          <SearchInput />
        </Col>
      </Row>

      <Table
        status={groups.status}
        thead={["Nama", "Aksi"]}
        data={groups.data}
        tbody={["nama", "Aksi"]}
        editUrl={`/group-page/edit-group`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default GroupPage;
