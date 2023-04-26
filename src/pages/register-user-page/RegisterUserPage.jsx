import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postData } from '../../utils/fetch'
import { setNotif } from '../../redux/notif/actions'
import RegisterInput from '../../components/Register-Input/RegisterInput'
import { fetchListsDepartement, fetchListsGroup } from '../../redux/lists/actions'

const RegisterUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    name : "",
    email : "",
    password : "",
    roles : "",
    posisi : "",
    DepartementId : "",
    GroupId : ""
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  })

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListsDepartement());
    dispatch(fetchListsGroup());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "DepartementId" || e.target.name === "GroupId") {
      setForm({...form, [e.target.name]: e})
    }else{
      setForm({...form, [e.target.name]: e.target.value})
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      name : form.name,
      email : form.email,
      password : form.password,
      roles : form.roles,
      posisi : form.posisi,
      DepartementId : form.DepartementId.valueOf,
      GroupId : form.GroupId.valueOf
    };

    const res = await postData("/auth/signup", payload);

    if(res.data.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `Register telah dibuat oleh ${res.data.data.name}`
        )
      );
      navigate("/work-order");
      setIsLoading(false)
    }else{
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg
      })
    }
  }

  return (
    <card>
      <RegisterInput 
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </card>
  )
}

export default RegisterUserPage