import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/Button";
import SelectBox from "../../components/selectBox";
import BreadCrumb from "../../components/Breadcrumb"
import Table from "../../components/TableWithAction"
import SearchInput from "../../components/SearchInput"

function RegisterPage() {
  return (
    <Container className="mt-3">
      <Button>Tambah</Button>
      <BreadCrumb textSecound={"User"} />
     {/* <Row>
        <Col>
         <SearchInput 
           name="keyword"
           query={""}
           handleChange={""}
         />
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
        <SelectBox
          placeholder={"Masukan pencarian Departement"}
          name="category"
          value={""}
          options={""}
          handleChange={""}
        />
        <Col>
          <SelectBox />
        </Col>
      </Row>

      <Table 
        thead={[
            "nama",
            "email",
            "Departement",
            "Group",
            "Posisi",
            "Roles",
        ]}
        tbody={[
            ""
        ]}
    /> */}
    </Container>
  );
}

export default RegisterPage;
