import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu button for mobile */}
      <button
        className="lg:hidden fixed top-4 right-4 z-40 p-2 rounded bg-[#0f172a] text-white focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay*/}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-60 bg-[#0f172a] text-white shrink-0
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:w-[300px] lg:min-h-screen
        `}
        style={{ minHeight: "60px" }}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between p-6 border-b border-[#1e293b]">
          <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
          <button
            className="lg:hidden p-2 ml-2 rounded bg-slate-800"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={28} />
          </button>
        </div>
        <nav className="mt-5">
          <ul className="space-y-1 px-4">
            <li
              className="bg-slate-800 text-white rounded-md p-3 cursor-pointer font-medium"
              onClick={() => {
                setOpen(false);
              }}
            >
              Dashboard
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
