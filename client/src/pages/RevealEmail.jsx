import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RevealEmail = () => {
  const [lead, setLead] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          `https://smallbiggrowthbackend.onrender.com/getLeadEmail/${id}`
        );
        setLead(response.data);
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, [id]); // Dependency on id to ensure useEffect runs when id changes

  const handleCheckout = async (ev) => {
    ev.preventDefault();

    try {
      // Call your backend to create a Razorpay order
      const response = await axios.post("https://smallbiggrowthbackend.onrender.com/razorpay", {
        amount: 500, // Specify the amount to charge the user
        currency: "INR", // Specify the currency
      });
      // console.log(response.data.order_id);
      const order_id = response.data.order_id;
      // console.log(order_id);
      // Initialize Razorpay
      const options = {
        key: "rzp_test_SrrurMUZ8xOO7f", // Enter your Razorpay API key
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", // Your business name
        order_id: order_id, // Pass the order_id obtained from your backend
        callback_url: `https://smallbiggrowthbackend.onrender.com/verification`,

        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-semibold text-3xl m-5" >Lead</h1>
      <div key={lead._id} className="border m-3 p-3 rounded-md flex flex-col justify-center items-center w-max">
        <div className="flex m-2 font-semibold text-2xl">
          <h1 className="pr-2">{lead.firstName}</h1>
          <h2>{lead.lastName}</h2>
        </div>
        <p className="flex m-2 font-semibold text-2xl"> Email : {lead.email}</p>
        <button
          className="border-2 p-3 px-5 m-1 rounded-md hover:bg-slate-200"
          id="rzp-button1"
          onClick={handleCheckout}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default RevealEmail;
