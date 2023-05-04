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
import { putData } from "../../utils/fetch";
import { fetchCheckouts } from "../../redux/checkouts/actions";
import { setNotif } from "../../redux/notif/actions";

function WorkOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const checkouts = useSelector((state) => state.checkouts);

  useEffect(() => {
    dispatch(fetchCheckouts());
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
          StatusWO: status === "Close" ? "Pending" : "Close",
        };
        const res = await putData(`/StatusWO/${id}`, payload);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil ubah status event ${res.data.data.title}`
          )
        );

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
          "Status",
          "Aksi",
        ]}
        data={checkouts.data}
        tbody={[
          "namaBarang",
          "kodeBarang",
          "permasalahan",
          "UserRequestId",
          "StatusWO",
          "Aksi",
        ]}
        confirmationUrl={`/work-order-page/confirmation-wo`}
        customAction={(id, status = "") => {
          return (
            <Button
              className={"mx-2"}
              variant="primary"
              size={"sm"}
              action={() => handleChangeStatus(id, status)}
            >
              Change Status
            </Button>
          );
        }}
        withoutPagination
      />
    </Container>
  );
}

export default WorkOrderPage;
