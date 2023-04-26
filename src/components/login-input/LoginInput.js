import React from "react";
import SButton from "../Button";
import TextInputWithLabel from "../TextInputWithLabel";
import { Form } from "react-bootstrap";

export default function SFORM({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukan email"}
        label={"Email"}
        name="email"
        value={form?.email}
        type="email"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukan password"}
        label={"Password"}
        name="password"
        value={form?.password}
        type="password"
        onChange={handleChange}
      />

      <SButton
        loading={isLoading}
        disabled={isLoading}
        variant="primary"
        className="w-full bg-danger font-Quicksand text-white border-2 mt-2 rounded py-2 px-4 hover:bg-primaryHover md:h-16 md:text-xl md:mt-4 lg:text-base lg:h-10"
        action={handleSubmit}
      >
        Submit
      </SButton>
    </Form>
  );
}
