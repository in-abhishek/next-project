"use client"
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '',status:false });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  console.log("hiii");
  console.log("process.env.BACKEND_API->>>>",process.env.NEXT_PUBLIC_BACKEND_API)
  const Value = (formDatas) => {
    const FormFields = Object.values(formDatas);
    return FormFields.every(field => field !== '');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const Values = Value(formData)
    if (Values) {
      const { name, email } = formData;
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user`, {
        mathod: "Post",
        body: JSON.stringify(
          {
            name: name,
            email: email,
            status:false,
          })
      })
        .then(response => {
          const data = response.message;
          alert("" + data + ". ");
        })
        .catch(error => console.log("error", error));
    }

    else {
      setFormData({
        ...formData, error: `value not filled`
      })
    }
  }
  console.log("formData->>>>", formData)
  return (
    <div className="form-data">
      <form action="">
        <div className="row">
          <div className="col-6">Name : </div>
          <div className="col-6"><input type="text" placeholder="Enter name" value={formData.name} name="name" onChange={handleChange} id="name" /></div>
        </div>
        <div className="row">
          <div className="col-6">Email : </div>
          <div className="col-6"><input type="email" placeholder="Enter email" value={formData.email} name="email" onChange={handleChange} id="email" /></div>
        </div>
        <div className="row"><button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}
