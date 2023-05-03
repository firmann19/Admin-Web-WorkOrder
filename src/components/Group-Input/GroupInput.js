import React from "react";
import SButton from "../Button";
import { Form } from "react-bootstrap";
import TextInputWithLabel from "../TextInputWithLabel";

function GroupInput({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form method="post" className="form-register-departements">
      <TextInputWithLabel
        placeholder={"Masukan nama Group..."}
        label={"Nama"}
        name="nama"
        value={form?.nama}
        type="text"
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

export default GroupInput;
