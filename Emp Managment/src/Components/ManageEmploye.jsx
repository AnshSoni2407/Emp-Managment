import  { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaFilter } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const ManageEmployee = () => {

  const navigate = useNavigate()
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedForDelete, setselectedForDelete] = useState({
    name: "",
    id: "",
  });

  const [isFilterActive, setIsFilterActive] = useState(false);

  const [sortOrder, setSortOrder] = useState({ name: "asc", salary: "asc" });
  const [filters, setFilters] = useState({
    name: "",
    salary: "",
    department: "",
    status: "",
  });

  
  // Fetch all employees
 useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8081/employees?page=${page}&limit=10`
      );
      const newData = res.data;

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        // prevent duplicate data
        setEmployees((prev) => {
          const ids = new Set(prev.map((e) => e.id || e._id));
          const unique = newData.filter((e) => !ids.has(e.id || e._id));
          return [...prev, ...unique];
        });
        setFilteredEmployees((prev) => {
          const ids = new Set(prev.map((e) => e.id || e._id));
          const unique = newData.filter((e) => !ids.has(e.id || e._id));
          return [...prev, ...unique];
        });
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };


  //  Filter Function
  const handleFilter = () => {
    let filtered = employees.filter((emp) => {
      const matchesName = emp.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesSalary = filters.salary
        ? emp.salary.toString().includes(filters.salary)
        : true;
      const matchesDept = filters.department
        ? emp.department
            .toLowerCase()
            .includes(filters.department.toLowerCase())
        : true;
      const matchesStatus = filters.status
        ? emp.status.toLowerCase().includes(filters.status.toLowerCase())
        : true;

      return matchesName && matchesSalary && matchesDept && matchesStatus;
      });
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [filters]);

  //  Sort by Name
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

  //  Sort by Salary
  const handleSortBySalary = () => {
    const newOrder = sortOrder.salary === "asc" ? "desc" : "asc";
    const sorted = [...filteredEmployees].sort((a, b) =>
      newOrder === "asc" ? a.salary - b.salary : b.salary - a.salary
    );
    setFilteredEmployees(sorted);
    setSortOrder({ ...sortOrder, salary: newOrder });
  };
  // delete Modal

  const openDeleteModal = (name, id) => {
    setdeleteModal(true);
    setselectedForDelete({name, id});
    console.log(selectedForDelete);
  };

  //  Delete Employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/employees/${id}`);

      fetchEmployees();
      setdeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  //  Edit Employee
  const handleEdit = (emp) => {
    
navigate("/add", { state: { employee: emp } });

  };

    // ✅ Infinite scroll
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100
        ) {
          console.log('FETCH APPLIED')
          if (hasMore) setPage((prev) => prev + 1);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);
  
  


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="relative text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-3">
          All Employees
          <button
            onClick={() => setIsFilterActive((prev) => !prev)}
            className="absolute right-0 top-0 bg-yellow-600 p-1 text-white px-3 rounded-2xl text-lg flex gap-2 items-center cursor-pointer hover:bg-yellow-800 transition-all duration-300"
          >
            Filter <FaFilter />
          </button>
        </h2>

        {isFilterActive && (
          <div className="flex flex-wrap justify-evenly items-center bg-white p-4 m-3 rounded-2xl shadow-md gap-3">
            {/*  Name Sort */}
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <input
                type="text"
                placeholder="Name: John Doe"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
                className="outline-none flex-grow text-gray-700 text-sm px-2"
              />
              <button
                onClick={handleSortByName}
                title="Sort by Name"
                className="text-xl p-1 bg-amber-600 text-white rounded-md hover:bg-amber-700 hover:scale-95 transition"
              >
                <TbArrowsSort />
              </button>
            </div>

            {/*  Salary Sort */}
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <input
                type="text"
                placeholder="Salary: 30000"
                value={filters.salary}
                onChange={(e) =>
                  setFilters({ ...filters, salary: e.target.value })
                }
                className="outline-none flex-grow text-gray-700 text-sm px-2"
              />
              <button
                onClick={handleSortBySalary}
                title="Sort by Salary"
                className="text-xl p-1 bg-amber-600 text-white rounded-md hover:bg-amber-700 hover:scale-95 transition"
              >
                <TbArrowsSort />
              </button>
            </div>

            {/*  Department Search */}
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <select
                placeholder="Department: IT / HR"
                className="outline-none flex-grow text-gray-700 text-sm px-2"
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
              >
                <option className="text-lg" value={""}>
                  All Departments
                </option>
                <option className="text-lg" value={"Sales"}>
                  Sales
                </option>

                <option className="text-lg" value={"Marketing"}>
                  Marketing
                </option>

                <option className="text-lg" value={"Engineering"}>
                  Engineering
                </option>

                <option className="text-lg" value={"HR"}>
                  HR
                </option>
              </select>
            </div>

            {/*  Status Search */}
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-[240px] hover:shadow-sm transition-all">
              <select
                className="outline-none flex-grow text-gray-700 text-sm px-2 bg-white"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option className=" text-lg" value="">
                  All Users
                </option>
                <option className=" text-lg" value="active">
                  Active
                </option>
                <option className=" text-lg" value="inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>
        )}

        {/*  Employee Table */}
        {filteredEmployees.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No employees found.
          </p>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg mt-4 h-[65vh] overflow-y-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Salary</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-t hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4 font-medium">{emp.name}</td>
                    <td className="py-3 px-4">{emp.email}</td>
                    <td className="py-3 px-4">{emp.department}</td>
                    <td className="py-3 px-4">{emp.designation}</td>
                    <td className="py-3 px-4">₹{emp.salary}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(emp.name, emp.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
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

        {/*  Delete Modal */}

        {deleteModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Delete Confirmation
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedForDelete.name}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleDelete(selectedForDelete.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setdeleteModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEmployee;
