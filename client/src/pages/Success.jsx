import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Success = () => {
  const [payment_id] = useSearchParams();
  return (
    <div className="flex justify-center items-center m-24 flex-col text-3xl ">
      <h1 className="m-2">Payment Successful </h1>
      <p className="m-2">Your Payment Id : {payment_id} </p>
      <Link to={'/homepage'}>
        <button className="m-2 rounded border-2 p-3 hover:bg-slate-200"> Back To Leads Page</button>
      </Link>
    </div>
  );
};

export default Success;
