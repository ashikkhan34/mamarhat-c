"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Function to check if a route is active
  const isActiveRoute = (route) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  };

  // Active link styles
  const activeClass =
    "text-green-600 font-semibold border-b-2 border-green-600";
  const inactiveClass = "hover:text-green-600";

  return (
    <nav className="bg-green-400/30 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          <img src="/image/logo.png" alt="logo" className="w-14" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-lg font-medium">
          <li>
            <Link
              href="/"
              className={`pb-1 transition-all ${
                isActiveRoute("/") ? activeClass : inactiveClass
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/partner"
              className={`pb-1 transition-all ${
                isActiveRoute("/partner") ? activeClass : inactiveClass
              }`}
            >
              Partner
            </Link>
          </li>
          <li>
            <Link
              href="/allFood"
              className={`pb-1 transition-all ${
                isActiveRoute("/allFood") ? activeClass : inactiveClass
              }`}
            >
              AllFood
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`pb-1 transition-all ${
                isActiveRoute("/contact") ? activeClass : inactiveClass
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Cart + Login */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/cart"
            className={`relative ${
              isActiveRoute("/cart") ? "text-green-600" : ""
            }`}
          >
            <ShoppingCart size={26} />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
          <Link
            href="/favorite"
            className={`relative ${
              isActiveRoute("/favorite") ? "text-green-600" : ""
            }`}
          >
            <Heart size={26} />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>

          <Link
            href="/login"
            className={`px-4 py-2 rounded-lg transition-all ${
              isActiveRoute("/login")
                ? "bg-green-700 text-white"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white px-6 pb-4 space-y-3 text-lg font-medium">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`block py-2 ${
                isActiveRoute("/") ? activeClass : inactiveClass
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/partner"
              onClick={() => setOpen(false)}
              className={`block py-2 ${
                isActiveRoute("/partner") ? activeClass : inactiveClass
              }`}
            >
              Partner
            </Link>
          </li>
          <li>
            <Link
              href="/allFood"
              onClick={() => setOpen(false)}
              className={`block py-2 ${
                isActiveRoute("/allFood") ? activeClass : inactiveClass
              }`}
            >
              AllFood
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`block py-2 ${
                isActiveRoute("/contact") ? activeClass : inactiveClass
              }`}
            >
              Contact
            </Link>
          </li>

          <div className="pt-4 flex items-center justify-between border-t">
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 ${
                isActiveRoute("/cart") ? "text-green-600" : ""
              }`}
            >
              <ShoppingCart size={26} />
              Cart (2)
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={`px-4 py-2 rounded-lg ${
                isActiveRoute("/login")
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              Login
            </Link>
          </div>
        </ul>
      )}
    </nav>
  );
}
