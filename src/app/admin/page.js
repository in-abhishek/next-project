"use client"
import React, { useEffect, useState } from 'react'
import Edit from './Edit'
import Delete from './Delete'
import axios from 'axios'
const Page = () => {
    const [data, setData] = useState();
    const [show,setShow] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.BACKEND_API}/user`).then(response => {
            setData(response.data);
            console.log("response-<<<", response.data.data);
        })
            .catch(error => console.log("error", error));

    }, [show])
    console.log("data->>>", data);
    return (
        <div className='admin-data'>
            <div className="header">
                <h2>Users Data</h2>
            </div>
            <table className="show-table">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data ?
                        data?.data?.map((item, key) => {

                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.status ? "Approved By Admin" : "Approval Pending"}</td>
                                    <td><Edit show={show} setShow={setShow} id={item?._id} status={item.status} /><Delete show={show} setShow={setShow} id={item?._id} /></td>
                                </tr>
                            )
                        }) : ''
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Page