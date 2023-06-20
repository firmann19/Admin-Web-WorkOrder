import React from "react";
import SButton from "../Button";
import SelectBox from "../selectBox";
import { Col, Form, Row } from "react-bootstrap";
import TextInputWithLabel from "../TextInputWithLabel";

function RegisterInput({ form, lists, handleChange, handleSubmit, isLoading }) {
  return (
    <Form method="post" className="form-register">
      <TextInputWithLabel
        placeholder={"Masukan nama..."}
        label={"Nama"}
        name="name"
        value={form?.name}
        type="text"
        onChange={handleChange}
   />

      <TextInputWithLabel
        placeholder={"Masukan email"}
        label={"Email"}
        name="email"
        value={form?.email}
        type="text"
        onChange={handleChange}
      />

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <SelectBox
            label={"Group"}
            placeholder={"Pilih group anda..."}
            name="Group"
            isClearable={true}
            value={form.GroupId}
            options={lists.groups}
            handleChange={(e) => handleChange(e)}
          />
        </Col>

        <Col className="me-3">
          <SelectBox
            label={"Departement"}
            placeholder={"Pilih departement anda..."}
            name="Departement"
            isClearable={true}
            value={form.DepartementId}
            options={lists.departements}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <SelectBox
            label={"Posisi"}
            placeholder={"Pilih posisi anda..."}
            name="posisiId"
            isClearable={true}
            value={form.posisiId}
            options={lists.positions}
            handleChange={(e) => handleChange(e)}
          />
        </Col>

        <Col className="me-3">
          <SelectBox
            label={"Role"}
            placeholder={"Pilih role anda..."}
            name="role"
            isClearable={true}
            value={form.roles}
            options={lists.role}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>


      <TextInputWithLabel
        placeholder={"Masukan Password"}
        label={"Password"}
        name="password"
        value={form?.password}
        type="password"
        onChange={handleChange}
      />
      <div className="mx-auto w-25 mt-5">
          <SButton
            className="w-100"
            loading={isLoading}
            disabled={isLoading}
            action={handleSubmit}
            variant="danger"
          >
            Submit
          </SButton>
      </div>
    </Form>
  );
}

export default RegisterInput;