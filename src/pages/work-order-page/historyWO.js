/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getData, putData } from "../../utils/fetch";
import { useEffect } from "react";
import HistoryWOInput from "../../components/HistoryWO-Input";
import Navbar from "../../components/navbar";
import moment from "moment";
import SButton from "../../components/Button";
import ApproveImg from "../../assets/images/approve-task.jpg";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";

function HistoryWO() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    UserRequestId: "",
    DepartUserId: "",
    namaBarang: "",
    kodeBarang: "",
    permasalahan: "",
    UserApproveId: "",
    date_requestWO: "",
    tindakan: "",
    gantiSparepart: "",
    HeadITid: "",
    User_IT: "",
    date_completionWO: "",
    statusPengerjaan: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const fetchOneWO = async () => {
    const res = await getData(`/checkout/${id}`);

    setForm({
      ...form,
      UserRequestId: res.data.data.userRequest.name,
      DepartUserId: res.data.data.Departement.nama,
      namaBarang: res.data.data.namaBarang,
      kodeBarang: res.data.data.kodeBarang,
      permasalahan: res.data.data.permasalahan,
      UserApproveId: res.data.data.userApprove.name,
      date_requestWO: moment(
        res.data.data.date_requestWO
      ).format("DD-MM-YYYY, h:mm:ss a"),
      tindakan: res.data.data.tindakan,
      gantiSparepart: res.data.data.gantiSparepart,
      HeadITid: res.data.data.HeadIT.name,
      User_IT: res.data.data.userIT.name,
      date_completionWO: moment(
        res.data.data.date_completionWO
      ).format("DD-MM-YYYY, h:mm:ss a"),
    });
  };

  useEffect(() => {
    fetchOneWO();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      statusPengerjaan: form.statusPengerjaan,
    };

    const res = await putData(`/statusProgress/${id}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          'berhasil Close Work Order'
        )
      );
      navigate("/work-order-page");
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
      <section class="history-order mx-auto">
        <div class="row">
          <div class="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
            <div class="container mx-auto">
              <img
                src={ApproveImg}
                width="502"
                height="391.21"
                class="img-fluid pb-50"
                alt=""
              />
              <h2 class="text-4xl text-center fw-bold color-palette-1 mb-10">
                History Work Order
              </h2>
              <p class="text-lg text-center color-palette-1 m-0">
                Silahkan selesaikan laporan work order
              </p>
              <div className="button-group d-flex flex-column mx-auto mt-3">
                <SButton
                  loading={isLoading}
                  disabled={isLoading}
                  variant="primary"
                  className="btn btn-sign-in fw-medium text-lg bg-danger text-white rounded-5 "
                  action={handleSubmit}
                >
                  Close Laporan
                </SButton>
              </div>
            </div>
          </div>
          <div class="col-xxl-7 col-lg-6 bg-blue pt-lg-145 pb-lg-145 d-lg-block d-none">
            <Card style={{ width: "80%" }} className="m-auto mt-5 mb-5">
              <Card.Body>
                <Card.Title className="text-center mb-5">
                  History Work Order
                </Card.Title>
                <HistoryWOInput form={form} isLoading={isLoading} />
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>

      {/* <Container md={12}>        
  </Container> */}
    </>
  );
}

export default HistoryWO;
