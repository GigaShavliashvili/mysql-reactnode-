import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $api from './axiosConfig'

const Orderhistory = () => {
const [data, setData] = useState([])
    useEffect(() =>{
$api("/api/order/all").then((res) =>{
    setData(res.data)
})
    },[])
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width:"100%" }}>
      {data.map((order: any,index) => {
        return (
          <div
            style={{ display: "flex", gap: "1rem", justifyContent:"space-between", alignItems: "center", width:"100%" }}
            key={order.id}
          >
            <div   style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span>{order.fullName}</span>
            <span>{order.email}</span>
            <span>{order.productName}</span>
            <span>{order.cost}$</span>
            </div>
            <div   style={{display:"flex", gap:"2rem", alignItems:"center"}}>
            <img src={order.img} width={"100px"} />
            <button
          
              onClick={() =>
                console.log("delete")
                
              }
            >
              delete
            </button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Orderhistory