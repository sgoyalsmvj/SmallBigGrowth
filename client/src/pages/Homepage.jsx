import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Homepage = () => {
  const [leadList, setLeadList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(6); // Number of leads to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://smallbiggrowthbackend.onrender.com/getAllLeads");
        setLeadList(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leadList.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold  m-5 ">Lead Page</h1>
      <ul className="w-full flex flex-wrap justify-center items-center ">
        {currentLeads.map((lead) => (
          <li key={lead._id} className="border m-3 p-3 w-1/4 rounded-md">
            <div className="flex m-2 font-semibold text-2xl">
              <h1 className="pr-2">{lead.firstName}</h1>
              <h2>{lead.lastName}</h2>
            </div>
            <p className="text-xl m-2">Company Name : {lead.companyName}</p>
            <p className="text-md m-2">Linkedin Profile : {lead.linkedinProfile}</p>
            <p className="text-md m-2">Job Title : {lead.jobTitle}</p>
            <Link to={`/revealemail/${lead._id}`}>
              <button className="border-2 p-2 m-1 rounded-md hover:bg-slate-200 w-1/4">Pay</button>
            </Link>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <ul className="flex justify-center items-center space-x-4">
        {Array.from(
          { length: Math.ceil(leadList.length / leadsPerPage) },
          (_, i) => (
            <li key={i}>
              <button onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Homepage;
