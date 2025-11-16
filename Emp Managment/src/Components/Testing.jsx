import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Testing = () => {
  const [employees, setemployees] = useState([]);
  const [page, setpage] = useState(1);
  const [serachTerm, setserachTerm] = useState("");
  const [hasMore, sethasMore] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/employees?page=${page}&limit=5`
        );

        if (res.data.length == 0){
           return sethasMore(false), console.log('No more data Found', hasMore)
        }
        setemployees((prev) => {
          const newData = res.data.filter(
            (item) => !prev.some((emp) => emp.id === item.id)
          );
          return [...prev, ...newData];
        });
        
        console.log(employees);
      } catch (error) {
        console.log("error while fetching data");
      }
    };

    fetchData();
  }, [page]);

  const orderASC = () => {
    const sorted = [...employees].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    setemployees(sorted);
  };

  const orderDes = () => {
    const sorted = [...employees].sort((a, b) =>
      b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
    setemployees(sorted);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const cardConatiner = wrapperRef.current;

    if (!hasMore) return;

    const handleScroll = () => {
   

      if(cardConatiner.scrollHeight-cardConatiner.scrollTop-cardConatiner.clientHeight < 50){
        setpage((prev)=> prev+1)
        console.log(page)
      }
    };

    cardConatiner.addEventListener("scroll", handleScroll);

    return () => {
      cardConatiner.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      Test emp
      <div>
        <button
          className="bg-blue-800 font-semibold p-2 m-2 rounded-2xl text-white"
          onClick={orderASC}
        >
          AscOrder
        </button>
        <button
          className="bg-blue-800 font-semibold p-2 m-2 rounded-2xl text-white"
          onClick={orderDes}
        >
          DesOrder
        </button>
        <input
          type="text"
          placeholder="Search By Name "
          className="border-2 px-1 text-center rounded-lg"
          onChange={(e) => setserachTerm(e.target.value)}
          value={serachTerm}
        ></input>
        <button>search</button>
      </div>
      <div
           ref={wrapperRef}
           className="relative w-[80%] h-[80vh] bg-yellow-200 m-auto p-6 rounded-2xl grid grid-cols-2 gap-4 overflow-y-auto"
           id="scrollableDiv"
            >
         {employees.map((elem) => {
          return (
            <div
              key={elem.id || elem._id}
              className="bg-blue-300 m-4  h-[400px] text-center px-8 rounded-2xl p-2"
            >
              <h1 className="text-4xl my-5 font-extrabold">
                Name : {elem.name}
              </h1>
              <h2>Email : {elem.email}</h2>
              <h1 className="text-4xl mt-5 font-semibold">
                Role : {elem.designation}
              </h1>
              <h1 className="text-gray-700"> {elem.department}</h1>
              <h1 className="text-3xl my-8  ">Rs : {elem.salary}</h1>
            </div>
          );
           })}
            {hasMore ? (
            <div className="text-center m-auto">Loading....</div>
         ) : (
          <div className=" absolute bottom-0 text-center m-auto">No More Data</div>
          )}
      </div>
      <button
        className="bg-blue-800 font-semibold p-2 m-2 rounded-2xl text-white"
        onClick={() => {
          setpage((prev) => prev + 1);
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Testing;
