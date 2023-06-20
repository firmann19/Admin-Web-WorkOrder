import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/TableWithAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import { putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import Navbar from "../../components/navbar";
import { fetchPengajuan } from "../../redux/pengajuan/actions";

function ChangeSparepartPage() {
  const dispatch = useDispatch();
  const pengajuans = useSelector((state) => state.pengajuans);

  useEffect(() => {
    dispatch(fetchPengajuan());
  }, [dispatch]);

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Ubah Status",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusPengajuan:
            status === "Diterima" ? "Belum Diketahui" : "Diterima",
        };
        const res = await putData(`/changeStatus/${id}`, payload);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil ubah status event ${res.data.data.title}`
          )
        );

        dispatch(fetchPengajuan());
      }
    });
  };

  const handleChangeStatusSecond = (id, status) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Ubah Status",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusPengajuan:
            status === "Ditolak" ? "Diterima" : "Ditolak",
        };
        const res = await putData(`/changeStatus/${id}`, payload);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil ubah status event ${res.data.data.title}`
          )
        );

        dispatch(fetchPengajuan());
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container className="mt-3">
      <BreadCrumb textSecound={"Change Sparepart"} />
      <Row>
        <Col md="4">
          <SearchInput />
        </Col>
      </Row>
      <Table
        status={pengajuans.status}
        thead={["Nama", "Departemen", "Sparepart", "Status", "Aksi"]}
        data={pengajuans.data}
        tbody={["userRequestWo", "departementUser", "namaSparepart", "statusPengajuan" ,"Aksi"]}
        customAction={(id, status = "") => {
          return (
            <Button
              className={"mx-2"}
              variant="success"
              size={"sm"}
              action={() => handleChangeStatus(id, status)}
            >
              Diterima
            </Button>
          );
        }}
        customActionSecond={(id, status = "") => {
          return (
            <Button
              className={"mx-2"}
              variant="danger"
              size={"sm"}
              action={() => handleChangeStatusSecond(id, status)}
            >
              Ditolak
            </Button>
          );
        }}
        Detail={`/changeSparepart-page/historyChangeSparepart-page`}
      />
    </Container>
    </>
  );
}

export default ChangeSparepartPage;
