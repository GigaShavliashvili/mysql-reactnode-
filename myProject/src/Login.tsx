import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router';
const Login = () => {

  const navigate = useNavigate();
    const handlerSubmit = (event:any) =>{
        event.preventDefault();
        const userName = event.target[0].value;
        const password = event.target[1].value;
        axios.post("/api/auth/login", {userName, password}
        ).then((res) =>{
          console.log(res)
          if(res.data.success === true){
            localStorage.setItem("token",JSON.stringify(res.data.data))
          localStorage.setItem("refreshtoken",JSON.stringify(res.data.refreshToken)) 
            navigate("/application")
          }
        }).catch(err => console.log(err))
    }
  return (
    <div>
        <form onSubmit={handlerSubmit} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>Username</label>
            <input type="text" name='username' />
            <label>password</label>
            <input type="password" name='password' />
            <br />
            <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Login