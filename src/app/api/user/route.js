import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
mongoose.connect(process.env.MONGODB_URI);
const app = express();
app.use(cors())
export async function GET(request) {
    if (request.method === 'GET') {
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            await client.connect();
            const database = client.db('adminData');
            const data = await database.collection("userFormData").find({}).toArray();
            // console.log("data->>",data)
            return NextResponse.json({ data: data, status: 201 });

        } catch (error) {

            console.log("error->>>", error)
            return NextResponse.json({ message: 'Something went wrong!' });
        }
    }

}

// post api
export async function POST(request) {
    if (request.method === 'POST') {
        let payload = await request.json();
        let payloadData = JSON.parse(payload.body);
        const { name, email, status } = payloadData;
        const client = new MongoClient(process.env.MONGODB_URI);

        try {
            await client.connect();
            const database = client.db('adminData');
            const collection = database.collection('userFormData');
            const user_email = await collection.findOne({ email: email });
            console.log("user_email->>.",user_email);
            if(user_email){
                return NextResponse.json({ message: 'Data Already existed!' });
            }
            await collection.insertOne({ name: name, email: email, status: status });
            return NextResponse.json({ message: 'Data saved successfully!' });

        } catch (error) {

            console.log("error->>>", error)
            return NextResponse.json({ message: 'Something went wrong!' });
        }
    }
}


// status update api

export async function PUT(request) {
    let payload = await request.json();
    const { _id } = payload.body;
    console.log("_id->>>",_id);
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const database = client.db('adminData');
        const collection = database.collection('userFormData');
        const user = await collection.findOne({ _id: new ObjectId(_id) });
        console.log("user->>>",user);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { status: true } });
        await client.close();

        return NextResponse.json({ message: 'Data updated successfully!' });
    } catch (error) {
        console.log("error->>>", error)
        return NextResponse.json({ message: 'Something went wrong!' });
    }
}

// delete data
export async function DELETE(request) {
    let payload =await request.json();
    console.log("payload->>>",payload)
    const { _id } = payload;
    console.log("_id->>>",_id);
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const database = client.db('adminData');
        const collection = database.collection('userFormData');
        const user = await collection.findOne({ _id: new ObjectId(_id) });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        await collection.deleteOne({ _id: new ObjectId(_id) });
        await client.close();

        return NextResponse.json({ message: 'Data Deleted successfully!' });
    } catch (error) {
        console.log("error->>>", error)
        return NextResponse.json({ message: 'Something went wrong!' });
    }
}