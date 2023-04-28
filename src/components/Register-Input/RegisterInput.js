import React from "react";
import { Link } from "react-router-dom";
import SButton from "../Button";
import SelectBox from "../selectBox";
import { Col, Form, Row } from "react-bootstrap";
import TextInputWithLabel from "../TextInputWithLabel";

function RegisterInput({ form, lists, handleChange, handleSubmit, isLoading }) {
  return (
    <Form className="form-register">
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
            value={form.group}
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
            value={form.departement}
            options={lists.departements}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <TextInputWithLabel
        placeholder={"Masukan Role..."}
        label={"Role"}
        name="roles"
        value={form?.roles}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukan Password"}
        label={"Password"}
        name="password"
        value={form?.password}
        type="password"
        onChange={handleChange}
      />
      <div className="mx-auto w-25 mt-5">
        <Link to="/complete-order">
          <SButton
            className="w-100"
            loading={isLoading}
            disabled={isLoading}
            action={handleSubmit}
            variant="danger"
          >
            Submit
          </SButton>
        </Link>
      </div>
    </Form>
  );
}

export default RegisterInput;
