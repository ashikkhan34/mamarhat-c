"use client";

import { useState } from "react";
import Link from "next/link";
import { IoFastFoodSharp } from "react-icons/io5";
import { Menu, X, Home, User, Settings } from "lucide-react";
import { MdOutlineCategory, MdOutlinePreview } from "react-icons/md";
import { GrRestaurant } from "react-icons/gr";


export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-white shadow-lg h-screen p-4 flex flex-col transition-all duration-300 sticky top-0`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className={`text-2xl font-bold transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          Dashboard
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Links */}
      <nav className="space-y-4">
        <SidebarLink open={open} icon={<Home />} label="Home" href="/dashboard" />
        <SidebarLink open={open} icon={<User />} label="Users" href="/dashboard/user" />
        <SidebarLink open={open} icon={<IoFastFoodSharp />} label="All Foods" href="/dashboard/all-food" />
        <SidebarLink open={open} icon={<MdOutlineCategory />} label="Category" href="/dashboard/all-category" />
        <SidebarLink open={open} icon={<GrRestaurant />} label="Restaurant" href="/dashboard/all-restaurant" />
        <SidebarLink open={open} icon={<MdOutlinePreview />} label="Review" href="/dashboard/all-review" />
      </nav>
      <hr />
      <SidebarLink open={open} icon={<Home />} label="Home" href="/" />
    </div>
  );
}

function SidebarLink({ open, icon, label, href }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-200 transition-all"
    >
      {icon}
      <span
        className={`text-base font-medium transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
