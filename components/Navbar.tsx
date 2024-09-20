import { useAuthState } from "@/context/auth";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  const { loading, authenticated } = useAuthState();
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-16 px-5 bg-white">
      <span className="text-2xl font-semibold text-gray-400">
        <Link href="/">Community</Link>
      </span>
      <div className="max-w-full px-4">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1  bg-transparent rounded focus:outline-none "
          />
        </div>
      </div>
      <div className="flex">
        {!loading &&
          (authenticated ? (
            <button className="w-20 p-2 mr-2 text-center text-white bg-gray-400 rounded">
              LOGOUT
            </button>
          ) : (
            <>
              <Link href={"/login"} legacyBehavior>
                <a className="w-20 p-2 mr-2 text-center text-blue-500 border border-blue-500 rounded">
                  LOGIN
                </a>
              </Link>
              <Link href={"/register"} legacyBehavior>
                <a className="w-20 p-2 text-center text-white bg-gray-400 rounded">
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
