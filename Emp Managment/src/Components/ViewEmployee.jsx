import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaFilter } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [sortOrder, setSortOrder] = useState({
    name: "asc",
    salary: "asc",
  });

  const [filters, setFilters] = useState({
    name: "",
    salary: "",
    department: "",
    status: "",
  });
  // ✅ Fetch employees
  const fetchEmployees = async (pageNum) => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/employees?page=${pageNum}&limit=10`,
      );

      // handle response properly
      const newData = res.data.employees;

      if (!newData || newData.length === 0) {
        setHasMore(false);
      } else {
        setEmployees((prev) => {
          const ids = new Set(prev.map((e) => e.id || e._id));
          const unique = newData.filter((e) => !ids.has(e.id || e._id));
          return [...prev, ...unique];
        });
       
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // ✅ Fetch whenever page changes
  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  //  Handle filters
useEffect(() => {
  const filtered = employees.filter((emp) => {
    return (
      (filters.name
        ? emp.name?.toLowerCase().includes(filters.name.toLowerCase())
        : true) &&
      (filters.salary
        ? emp.salary?.toString().includes(filters.salary)
        : true) &&
      (filters.department
        ? emp.department
            ?.toLowerCase()
            .includes(filters.department.toLowerCase())
        : true) &&
      (filters.status
        ? emp.status?.trim().toLowerCase() ===
          filters.status.trim().toLowerCase()
        : true)
    );
  });

  setFilteredEmployees(filtered);
}, [filters, employees]);


  // Sorting by Name
  const handleSortByName = () => {
    const newOrder = sortOrder.name === "asc" ? "desc" : "asc";
    const sorted = [...filteredEmployees].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return newOrder === "asc" ? -1 : 1;
      if (a.name.toLowerCase() > b.name.toLowerCase())
        return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredEmployees(sorted);
    setSortOrder({ ...sortOrder, name: newOrder });
  };

  //  Sorting by Salary
  const handleSortBySalary = () => {
    const newOrder = sortOrder.salary === "asc" ? "desc" : "asc";
    const sorted = [...filteredEmployees].sort((a, b) =>
      newOrder === "asc" ? a.salary - b.salary : b.salary - a.salary,
    );
    setFilteredEmployees(sorted);
    setSortOrder({ ...sortOrder, salary: newOrder });
  };

  // Infinite scroll
  const wrapperRef = useRef(null);
  const hasMoreRef = useRef(hasMore);

  // keep hasMore always updated
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = wrapper;

      // when scroll reaches bottom
      if (scrollHeight - scrollTop - clientHeight < 1) {
        if (hasMoreRef.current) {
          setPage((prev) => prev + 1);
        }
      }
    };

    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, [hasMore, employees]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="relative text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-3">
          All Employees
          <button
            onClick={() => setIsFilterActive((prev) => !prev)}
            className="absolute right-0 top-0 bg-yellow-600 p-2 text-white   rounded-xl  text-lg flex gap-2 items-center cursor-pointer hover:bg-yellow-800 transition-all duration-300"
          >
            <span className=" hidden md:block">Filters</span> <FaFilter />
          </button>
        </h2>

        {/* 🔹 Filter Section */}
        {isFilterActive && (
          <div className="flex flex-wrap justify-evenly items-center bg-white p-4 m-3 rounded-2xl shadow-md gap-3">
            {/* Name Search + Sort */}
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <input
                className="outline-none flex-grow text-gray-700 text-sm px-2"
                type="text"
                placeholder="Search by Name"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
              <button
                onClick={handleSortByName}
                className="text-xl p-1 bg-amber-600 text-white rounded-md hover:bg-amber-700 hover:scale-95 transition"
                title="Sort by Name"
              >
                <TbArrowsSort />
              </button>
            </div>

            {/* Salary Search + Sort */}
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <input
                className="outline-none flex-grow text-gray-700 text-sm px-2"
                type="text"
                placeholder="Search by Salary"
                value={filters.salary}
                onChange={(e) =>
                  setFilters({ ...filters, salary: e.target.value })
                }
              />
              <button
                onClick={handleSortBySalary}
                className="text-xl p-1 bg-amber-600 text-white rounded-md hover:bg-amber-700 hover:scale-95 transition"
                title="Sort by Salary"
              >
                <TbArrowsSort />
              </button>
            </div>

            {/* Department Filter */}
            <div className=" h-9.5  flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <select
                className="outline-none flex-grow text-gray-700 text-sm px-2"
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
              >
                <option value="">All Departments</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="h-9.5  flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <select
                className="outline-none flex-grow text-gray-700 text-sm px-2 bg-white"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        )}

        {/* 🔹 Employee Table */}
        {filteredEmployees.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No employees found.
          </p>
        ) : (
          <div
            ref={wrapperRef}
            className="employee-table-wrapper bg-white rounded-2xl shadow-lg mt-4 h-[65vh] overflow-y-auto"
          >
            <table className="min-w-full text-left border-collapse text-sm md:text-base">
              <thead className="sticky top-0 bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th className="px-2 py-2 md:px-4 md:py-3">Name</th>
                  <th className="px-2 py-2 md:px-4 md:py-3">Email</th>
                  <th className="px-2 py-2 md:px-4 md:py-3">Department</th>
                  <th className="px-2 py-2 md:px-4 md:py-3">Designation</th>
                  <th className="px-2 py-2 md:px-4 md:py-3">Salary</th>
                  <th className="px-2 py-2 md:px-4 md:py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id || emp._id}
                    className="border-t hover:bg-gray-50 transition-all"
                  >
                    <td className="px-2 py-2 md:px-4 md:py-3 font-medium">
                      {emp.name}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">{emp.email}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {emp.department}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {emp.designation}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">₹{emp.salary}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <span
                        className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${
                          emp.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {hasMore ? (
              <p className="text-center text-gray-500 py-4">Loading more...</p>
            ) : (
              <p className="text-center text-gray-500 py-4">
                No more employees
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEmployee;
