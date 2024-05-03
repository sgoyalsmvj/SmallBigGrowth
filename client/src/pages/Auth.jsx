import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      alert("login successful!");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  }
  const googleAuth = async () => {
    window.open("/google/callback", "_self");
  };

  if (redirect) {
    return <Navigate to={"/homepage"} />;
  }
  return (
    <div className=" w-full flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold text-3xl m-5">Login</h1>
      <form
        className="border-2 flex flex-col justify-center items-center w-1/3  p-6 rounded-lg "
        onSubmit={handleLoginSubmit}
      >
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
          <button className="m-2 p-2 border-2 rounded-md">Login</button>
          <button className="m-2 p-2  border-2 rounded-md" onClick={googleAuth}>
            Login with Google
          </button>
        </div>
        <div className="">
          Don't have an account yet?
          <Link className="underline" to={"/register"}>
            Register Now!
          </Link>
        </div>
      </form> 
    </div>
  );
};

export default LoginPage;
