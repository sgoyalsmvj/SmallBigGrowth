import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  async function handleLogout() {
    try {
      await axios.get("https://smallbiggrowthbackend.onrender.com/logout");
      return <Navigate to="/" />;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
