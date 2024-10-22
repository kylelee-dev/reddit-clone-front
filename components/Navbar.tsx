import { useAuthDispatch, useAuthState } from "@/context/auth";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { loading, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();
  const handleLogout = async () => {
    axios
      .post("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-16 px-5 bg-white">
      <span className="text-2xl font-semibold text-gray-400">
        <Link href="/">Community</Link>
      </span>
      <div className="max-w-full px-4">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white">
          <FaSearch  className="ml-2 text-gray-400"/>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 h-7 bg-transparent rounded focus:outline-none "
          />
        </div>
      </div>
      <div className="flex">
        {!loading &&
          (authenticated ? (
            <button
              className="w-20 px-2 mr-2 text-center text-white h-7 text-sm bg-gray-400 rounded"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          ) : (
            <>
              <Link href={"/login"} legacyBehavior>
                <a className="w-20 px-2 pt-1 mr-2 text-center h-7 text-sm text-blue-500 border border-blue-500 rounded">
                  LOGIN
                </a>
              </Link>
              <Link href={"/register"} legacyBehavior>
                <a className="w-20 px-2 pt-1 text-center text-white h-7 text-sm bg-gray-400 rounded">
                  SIGNUP
                </a>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
