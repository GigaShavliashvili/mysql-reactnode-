import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate();
    const submitHandler = (event: any) => {
        event.preventDefault();
        if (event.target[4].value !== event.target[5].value) return null;
        const body = {
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            userName: event.target[2].value,
            email: event.target[3].value,
            password: event.target[4].value,
        };
        axios.post("http://localhost:4000/api/auth/register", body,).then(res => res.data.token ? navigate("/login") : console.log("somthin went wring!")).catch(err => console.log(err))

    }
    return (
        <div >
            <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>firsName</label>
                <input type="text" name="firstName" />
                <label>lastName</label>
                <input type="text" name="lastName" />
                <label>userName</label>
                <input type="text" name="userName" />
                <label>email</label>
                <input type="text" name="email" />
                <label>password</label>
                <input type="password" name="password" />
                <label>compare password</label>
                <input type="password" name="password" />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register