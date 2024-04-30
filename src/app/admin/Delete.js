"use client"
import axios from 'axios';
import React from 'react'


const Delete = (props) => {
  const { id,setShow,show } = props;
  const handleClickDelete = async (userId) => {
    console.log("userId->>>", userId);
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user`, {
      method: 'DELETE',
      body: JSON.stringify({
        _id: userId
      })
    })
    if(resp.ok){
      alert("Data successfully deleted");
      setShow(!show);
    }
  }
  return (
    <button className='edit-Btn delete-btn' onClick={() => { handleClickDelete(id) }}>Delete</button>
  )
}

export default Delete