
"use client"
import axios from 'axios';
import React from 'react'

const Edit = (props) => {
  const { id,status,setShow ,show} = props;
  const handleClickEdit = (userId) => {
    console.log("userId->>>", userId);
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user`, {
      mathod: "Put",
      body: { _id: userId }
    }).then(response => {
      alert("Data successfully Editted By Admin");
      setShow(!show);
    })
      .catch(error => console.log("error", error))
  }
  return (
      <button  className={status ? "add_disabled edit-Btn" : "not_disableld edit-Btn" } onClick={()=>handleClickEdit(id)}>Approve</button> 
   
  )
}

export default Edit