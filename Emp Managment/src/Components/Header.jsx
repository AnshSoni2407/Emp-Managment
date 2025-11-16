import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { TbArrowsSort } from "react-icons/tb";
import { HiOutlineSearch } from "react-icons/hi";
import { FaEye, FaFilter, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";


const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-white p-2 m-2 rounded text-center flex justify-evenly items-center font-semibold shadow-md">
        <button
          onClick={() => navigate("/")}
          className="text-3xl cursor-pointer hover:text-blue-700 hover:scale-125 transition-all duration-300"
        >
          <IoHome />
        </button>
        {/* Manage Employee */}
        <button
          onClick={() => navigate("/manage")}
          className="bg-yellow-600 p-1 text-white px-2 hover:bg-yellow-800 transition-all duration-300 rounded-2xl text-xl flex gap-3 items-center cursor-pointer"
        >
          Manage <FaTools />
        </button>

        {/* View Employee */}
        <button
          onClick={() => navigate("/view")} // you can change /1 to a dynamic id when you integrate backend
          className="bg-blue-600 p-1 text-white px-2 hover:bg-blue-950 transition-all duration-300 rounded-2xl text-xl flex gap-3 items-center cursor-pointer"
        >
          View <FaEye />
        </button>

        {/* Add Employee */}
        <button
          onClick={() => navigate("/add")}
          className="bg-green-700 p-1 text-white px-2 rounded-2xl text-xl flex gap-3 items-center cursor-pointer hover:bg-green-950 transition-all duration-300"
        >
          Add <IoMdAddCircle />
        </button>

        <button
          onClick={() => navigate("/auth")}
          className="text-3xl cursor-pointer hover:text-blue-700 hover:scale-125 transition-all duration-300"
        >
          <FaUserCircle />
        </button>
      </nav>
    </div>
  );
};

export default Header;
