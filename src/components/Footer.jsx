import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/");
    localStorage.removeItem("userData");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-2 py-2 text-gray-700">
      <button
        type="submit"
        onClick={LogOut}
        className="text-red-600 font-bold focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-3 text-center"
      >
        Kijelentkezés
      </button>

      <p className="text-xs mb-1">
        Készítette: Kun-Fagyal Zoltán &copy; {year}
      </p>
      <p className="text-xs">Minden jog fenntartva!</p>
    </div>
  );
};

export default Footer;
