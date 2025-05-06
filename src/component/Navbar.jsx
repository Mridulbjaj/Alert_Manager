import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#111] px-5 py-4 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <span className="text-white font-bold">SentinelOne</span>
        <span className="text-gray-400">Alert Manager</span>
      </div>
      <div className="flex gap-6 text-sm text-gray-300">
        <ul className="flex gap-6 list-none items-center">
          <li>
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white transition duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/workflow"
              className="text-sm text-gray-400 hover:text-white transition duration-200"
            >
              Workflow
            </Link>
          </li>
          <li>
            <Link
              to="/Settings"
              className="text-sm text-gray-400 hover:text-white transition duration-200"
            >
              Settings
            </Link>
          </li>
        </ul>


        <button className="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m8.66-11H3.34M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
;
