import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";

const Done = () => {
  const [todos, setTodos] = useState([]);
  const savedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    axios
      .get("/completed")
      .then((res) =>
        setTodos(res.data.filter((todo) => todo.author === savedUserData?.name))
      )
      .catch((err) => console.log(err));
  }, [todos]);

  return (
    <div className=" w-full mt-4 md:w-96 sm:w-96 ">
      {todos.map((todo) => (
        <div
          className="flex justify-between mb-5 p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          key={todo.id}
        >
          <div className="flex justify-between">
            <Todo key={todo.id} todo={todo} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Done;
