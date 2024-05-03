import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
// import { set } from "mongoose";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      alert("registration successful!");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Registration Failed! Try Again later.");
    }
  }

  const googleAuth = async () => {
    window.open("http://localhost:5000/google/callback", "_self");
  };

  if (redirect) {
    return <Navigate to={"/homepage"} />;
  }
  return (
    <div className=" w-full flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold text-3xl m-5">Register</h1>
      <form
        className="border-2 flex flex-col justify-center items-center w-1/3  p-6 rounded-lg "
        onSubmit={registerUser}
      >
        <input
        className="m-2 p-2 w-2/3 border-2 rounded-md"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          className="m-2 p-2 w-2/3 border-2 rounded-md"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          className="m-2 p-2 w-2/3 border-2 rounded-md"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <div className="flex justify-around items-center">
          <button className="m-2 p-2 border-2 rounded-md">Register</button>
          <button className="m-2 p-2 border-2 rounded-md" onClick={googleAuth}>
            Sign up with Google
          </button>
        </div>
        <div className="">
          Already A member?
          <Link className="underline" to={"/"}>
            Login!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
