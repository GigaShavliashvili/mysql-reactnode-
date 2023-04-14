import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import moment from "moment";
function App() {
  const [count, setCount] = useState([]);
  const [updata, setUpdata] = useState<number | null>();
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  useEffect(() => {
    axios.get("http://localhost:4000/api").then((res) => {
      console.log(res);
      setCount(res.data.item1);
    });
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log(event);
    const body = {
      name: event.target[0].value,
      address: event.target[1].value,
    };
    axios
      .post("http://localhost:4000/api/add", body)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(body);
  };

  const deleteHandler = (id: number) => {
    axios
      .delete("http://localhost:4000/api/delete", { params: { id } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };


  const updataHendler = (item:any) =>{
    const body = {
      id:item,
       name:name,
       address:"tbilisi" + name
    }
    
    axios.put("http://localhost:4000/api/put",body).then((res) =>{
setUpdata(null)
console.log(res)
    }).catch((err) => console.log(err))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" name="fullName" />
        <input type="text" name="address" />
        <button type="submit">Submit</button>
      </form>
      <br />
      {count.map(
        (item: {
          fullName: string;
          address: string;
          date: string;
          id: number;
        }) => {
          return (
            <div
              key={item.id}
              style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
            >
              {updata === item.id ? <input onChange={(e) =>{
                setName(e.target.value)}
              } defaultValue={item.fullName}/> : <p>სახელი:{item.fullName}</p>}
              
              <p>მისამართი:{item.address}</p>
              <p>დაბადების თარიღი:{moment(item.date).format("DD:MM:YY")}</p>
              <button
                onClick={() => {
                  deleteHandler(item.id);
                }}
              >
                წაშლა
              </button>
              {updata !== item.id ? <button   onClick={() => {
                console.log(item.id)
                setUpdata(item.id)
                }}>განახლება</button> :<button   onClick={() => {
                updataHendler(item.id)
                  }}>დამახსოვრება</button>}
            </div>
          );
        }
      )}
    </>
  );
}

export default App;
