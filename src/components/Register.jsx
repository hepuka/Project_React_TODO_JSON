import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users]);

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-]).{8,}$/;
    return passwordRegex.test(password);
  }

  const signUp = (e) => {
    e.preventDefault();

    if (
      password === password2 &&
      validatePassword(password) &&
      emailRegex.test(email) &&
      users.filter((user) => user.email === email).length === 0
    ) {
      axios
        .post("/users", {
          name: name,
          email: email,
          password: password,
          createdAt: new Date().toLocaleDateString(),
        })
        .then((res) => {
          alert("Felhasználó hozzáadva!");
          navigate("/");
        });
    } else {
      alert(
        "Hibás adatot adott meg vagy ezzel az email címmel már regisztráltak!"
      );
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center mt-5 h-screen gap-3">
      <div className="w-40 h-40">
        <img className="h-full w-full" src="/Logo.png" alt="logo" />
      </div>

      <h1 className="text-xl font-bold text-gray-700  text-center mt-2">
        Hajdú-Bihar Vármegyei Kormányhivatal
      </h1>
      <h1 className="text-l font-bold text-gray-700  text-center mb-7">
        Feladatnyilvántartó Portál
      </h1>

      <form className="w-full max-w-sm px-8">
        <div className="mb-5">
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-white">
            Név
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg az neved"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg az email címet"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-white">
            Jelszó
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="Add meg a jelszót"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="Add meg a jelszót újra"
          />
        </div>
        <div className="mb-5 text-justify">
          <span className="text-xs text-red-500">
            Legalább 8 karakter hosszú és tartalmaznia kell egy nagybetűt,
            kisbetűt, számot és speciális karaktert.
          </span>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center">
          <button
            type="submit"
            onClick={signUp}
            className="text-white bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Elküld
          </button>
          <Link className="text-gray-700 text-xs" to={"/"}>
            Vissza
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
