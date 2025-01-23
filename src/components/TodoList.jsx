import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const savedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    axios
      .get("/todos")
      .then((res) =>
        setTodos(res.data.filter((todo) => todo.author === savedUserData.name))
      )
      .catch((err) => console.log(err));
  }, [todos]);

  const toggleComplete = async (todo) => {
    axios
      .post("/completed", {
        id: todo.id,
        author: todo.author,
        title: todo.title,
        description: todo.description,
        department: todo.department,
        date: new Date().toLocaleDateString(),
        completed: true,
      })
      .then((res) => {
        axios.delete("/todos/" + todo.id).then((res) => {
          alert("Feladat teljesítve");
        });
      });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Törli a feladatot?");
    if (confirm) {
      axios.delete("/todos/" + id).then((res) => {
        window.location.reload();
      });
    }
  };

  return (
    <div className=" w-full mt-4 md:w-96 sm:w-96 ">
      {todos.map((todo) => (
        <div
          className="flex justify-between mb-5 p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          key={todo.id}
        >
          <Link to={`/dashboard/edit/${todo.id}`} key={todo.id}>
            <div className="flex justify-between">
              <Todo key={todo.id} todo={todo} />
            </div>
          </Link>
          <div className="flex gap-6">
            <button onClick={() => toggleComplete(todo)}>
              <CheckCircleIcon id="i" />
            </button>
            <button onClick={() => handleDelete(todo.id)}>
              <DeleteIcon id="i" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
