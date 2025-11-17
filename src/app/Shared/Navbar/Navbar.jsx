"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Heart } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-green-600">
              Products
            </Link>
          </li>
          <li>
            <Link href="/categories" className="hover:text-green-600">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/offers" className="hover:text-green-600">
              Offers
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-green-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Cart + Login */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={26} />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
          <Link href="/favorite" className="relative">
            <Heart size={26} />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" onClick={() => setOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/categories" onClick={() => setOpen(false)}>
              Categories
            </Link>
          </li>
          <li>
            <Link href="/offers" onClick={() => setOpen(false)}>
              Offers
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>

          <div className="pt-4 flex items-center justify-between border-t">
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart size={26} />
              Cart (2)
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Login
            </Link>
          </div>
        </ul>
      )}
    </nav>
  );
}
