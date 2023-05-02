/* eslint-disable no-sparse-arrays */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/users/actions";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import { Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import Table from "../../components/TableWithAction"

function SettingPage() {
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/user/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus user ${res.data.data.delete_User}`
          )
        );

        dispatch(fetchUsers());
      }
    });
  };

  return (
    <Container>
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={users.status}
        thead={[
          "nama",
          "email",
          "Departement",
          "Group",
          "Role",,
          "Aksi",
        ]}
        data={users.data}
        tbody={[
          "name",
          "email",
          "Departement",
          "Group",
          "roles",
        ]}
        editUrl={`/update-user`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default SettingPage;
