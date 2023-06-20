/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Container } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getData, putData } from "../../utils/fetch";
import { useEffect } from "react";
import HistoryWOInput from "../../components/HistoryWO-Input";
import Navbar from "../../components/navbar";
import moment from "moment";
import SButton from "../../components/Button";
import { toast } from "react-toastify";
import ApproveImg from "../../assets/images/approve-task.jpg";

function HistoryWO() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    UserRequestId: 0,
    DepartUserId: 0,
    namaBarang: "",
    kodeBarang: "",
    permasalahan: "",
    UserApproveId: 0,
    date_requestWO: "",
    tindakan: "",
    gantiSparepart: "",
    HeadITid: 0,
    User_IT: "",
    date_completionWO: "",
    statusPengerjaan: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneWO = async () => {
    const res = await getData(`/checkout/${id}`);

    setForm({
      ...form,
      UserRequestId: res.data.data.getCheckout_ById.UserRequestId,
      DepartUserId: res.data.data.getCheckout_ById.DepartUserId,
      namaBarang: res.data.data.getCheckout_ById.namaBarang,
      kodeBarang: res.data.data.getCheckout_ById.kodeBarang,
      permasalahan: res.data.data.getCheckout_ById.permasalahan,
      UserApproveId: res.data.data.getCheckout_ById.UserApproveId,
      date_requestWO: moment(
        res.data.data.getCheckout_ById.date_requestWO
      ).format("DD-MM-YYYY, h:mm:ss a"),
      tindakan: res.data.data.getCheckout_ById.tindakan,
      gantiSparepart: res.data.data.getCheckout_ById.gantiSparepart,
      HeadITid: res.data.data.getCheckout_ById.HeadITid,
      User_IT: res.data.data.getCheckout_ById.User_IT,
      date_completionWO: moment(
        res.data.data.getCheckout_ById.date_completionWO
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

    await putData(`/statusProgress/${id}`, payload)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(`Berhasil konfirmasi Work Order`);
          navigate("/work-order-page");
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
