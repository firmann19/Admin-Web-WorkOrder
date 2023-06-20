import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function HistoryWOInput({ form, handleSubmit, handleChange, isLoading }) {
  return (
    <>
    <Form method="post" className="form-register">
      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>User</Form.Label>
          <Form.Control
            name="UserRequestId"
            value={form?.UserRequestId}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>

        <Col className="me-3">
          <Form.Label>Nama Peralatan</Form.Label>
          <Form.Control
            name="namaBarang"
            value={form?.namaBarang}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>Departemen</Form.Label>
          <Form.Control
            name="DepartUserId"
            value={form?.DepartUserId}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>

        <Col className="me-3">
          <Form.Label>Kode Peralatan</Form.Label>
          <Form.Control
            name="KodeBarang"
            value={form?.kodeBarang}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>Tanggal Work Order</Form.Label>
          <Form.Control
            name="date_requestWO"
            value={form?.date_requestWO}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>

        <Col className="me-3">
          <Form.Label>Tanggal Pengerjaan</Form.Label>
          <Form.Control
            name="KodeBarang"
            value={form?.date_completionWO}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Permasalahan</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={form?.permasalahan}
          disabled
          readOnly
        />
      </Form.Group>

      <Row className="mt-4">
        <Col className="ms-3">
          <Form.Label>Tindakan :</Form.Label>
        </Col>
        <Col>
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Perbaikan`}
          />
        </Col>

        <Col className="me-3">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Pergantian`}
          />
        </Col>

        <Col className="me-3">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Request_Data`}
          />
        </Col>

        <Col className="me-3">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Others`}
          />
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          id="tindakan"
          name="tindakan"
          value={form?.tindakan}
          onChange={handleChange}
          disabled
          readOnly
        />
      </Form.Group>

      <Form.Group className="mb-4 mt-4">
        <Form.Label>Sparepart yang diganti</Form.Label>
        <Form.Control
          id="gantiSparepart"
          name="gantiSparepart"
          value={form?.gantiSparepart}
          onChange={handleChange}
          as="textarea"
          rows={3}
          disabled
          readOnly
        />
      </Form.Group>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>Pemohon</Form.Label>
          <Form.Control
            name="departementId"
            value={form?.UserRequestId}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>

        <Col className="ms-2">
          <Form.Label>Disetujui</Form.Label>
          <Form.Control
            name="departementId"
            value={form?.UserApproveId}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>

        <Col className="ms-2">
          <Form.Label>Dikerjakan Oleh</Form.Label>
          <Form.Control
            name="User_IT"
            value={form?.User_IT}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>

        <Col className="ms-2">
          <Form.Label>Diketahui</Form.Label>
          <Form.Control
            name="HeadITid"
            value={form?.HeadITid}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>
      </Row>
    </Form>
      </>
  );
}

export default HistoryWOInput;
