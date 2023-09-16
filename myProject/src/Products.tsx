import axios from "axios";
import React, { useEffect, useState } from "react";
import $api from "./axiosConfig";
import jwt_decode from "jwt-decode";

const Products = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://www.themealdb.com/api/json/v1/1/search.php?f=b ",
    }).then((res) => {
      setData(res.data.meals);
    });
  }, []);


  const token:string = JSON.parse(localStorage.getItem("token")??"")
 const decodedToken:any = jwt_decode(token)
const id = decodedToken.id



  const orderHandler = (userId: number, productName: string, cost: string, img:string) => {
    $api
      .post("/api/order", {
        userId: id,
        productName: productName,
        cost: Number(cost),
        img:img,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {data.map((meal: any) => {
        return (
          <div
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
            key={meal.idMeal}
          >
            <img src={meal.strMealThumb} width={"100px"} />
            <span>{meal.strMeal}</span>
            <span>{meal.idMeal.slice(4)}$</span>
            <button
              onClick={() =>
                orderHandler(1, meal.strMeal, meal.idMeal.slice(4), meal.strMealThumb)
              }
            >
              order
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
