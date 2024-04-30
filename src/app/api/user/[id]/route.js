import { NextResponse } from "next/server";
import {product} from '../../../../utils/user'
export async function GET(request,content){
    const data = product;
    const filterData = data.filter((item,key)=> item.id === parseInt(content.params.id) )
    return NextResponse.json(filterData.length === 0 ? {result: "No Data Found"} : filterData,{status:201});
}