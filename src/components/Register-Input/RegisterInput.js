import React from "react";
import { Link } from "react-router-dom";
import SButton from "../Button";
import SelectBox from "../selectBox";

function RegisterInput({ form, lists, handleChange, handleSubmit, isLoading }) {
  return (
    <form className="container-register-user">
      <h1>Register</h1>
      <p>Create your account</p>
      <input
        type="text"
        name="fullname"
        className="colom-name"
        placeholder="FullName"
        value={form?.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        className="colom-email"
        placeholder="Email"
        value={form?.email}
        onChange={handleChange}
      />

      <div className="flex flex-wrap">
        <div className="p-4 w-1/3">
          <div className="relative">
            <SelectBox
              label={"Group"}
              placeholder={"Pilih groud anda..."}
              name="Group"
              isClearable={true}
              value={form.GroupId}
              options={lists.GroupId}
              handleChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="p-4 w-1/3">
          <div className="relative">
            <SelectBox
              label={"Departement"}
              placeholder={"Pilih departement anda..."}
              name="Departement"
              isClearable={true}
              value={form.DepartementId}
              options={lists.DepartementId}
              handleChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>

      <input
        type="text"
        name="role"
        className="colom-role"
        placeholder="Role"
        value={form?.roles}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        className="colom-password"
        placeholder="Password"
        value={form?.password}
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
    </form>
  );
}

export default RegisterInput;
