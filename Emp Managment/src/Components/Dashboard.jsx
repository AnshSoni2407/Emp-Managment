import React from "react";
import Header from "./Header.jsx";
import dashBG from "../assets/dash.jpg"; // ✅ Image import

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div
        className="mt-4 h-[90vh] w-full bg-cover bg-center rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${dashBG})`,
        }}
      >
        <div className="flex flex-col items-center justify-center h-[30vh] backdrop:blur-3xl bg-black/50  hover:bg-black/80  transition-all duration-500 bg-opacity-40 text-white">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to Employee Dashboard
          </h1>
          <p className="text-lg opacity-90">
            Track your team's performance and stats easily
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
