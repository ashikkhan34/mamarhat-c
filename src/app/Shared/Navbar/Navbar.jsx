"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import useAxiosPublic from "@/app/Hooks/useAxiosPublic";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  // CUSTOM LOGIN USER (localStorage)
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setLocalUser(JSON.parse(savedUser));
    }
  }, []);

  // NEXTAUTH SOCIAL LOGIN USER
  const { data: session } = useSession();

  const user = session?.user || localUser;

  // UNIFIED LOGOUT FUNCTION
 const handleLogout = async () => {
  try {
    if (localUser) {
      await axiosPublic.post("/api/auth/logout"); // custom backend logout
      localStorage.removeItem("user");
      setLocalUser(null);
    }

    if (session) {
      // Social login
      await signOut({ callbackUrl: "/login" });
    }

    // Jodi duita na thake
    if (!localUser && !session) {
      router.push("/login");
    }
  } catch (err) {
    console.log("Logout error:", err);
  }
};



  // Check active route
  const isActiveRoute = (route) => {
    if (route === "/") return pathname === "/";
    return pathname.startsWith(route);
  };

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
              className={`pb-1 ${isActiveRoute("/") ? activeClass : inactiveClass}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/partner"
              className={`pb-1 ${isActiveRoute("/partner") ? activeClass : inactiveClass}`}
            >
              Partner
            </Link>
          </li>
          <li>
            <Link
              href="/allFood"
              className={`pb-1 ${isActiveRoute("/allFood") ? activeClass : inactiveClass}`}
            >
              AllFood
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`pb-1 ${isActiveRoute("/contact") ? activeClass : inactiveClass}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side: Cart + User / Login */}
        <div className="hidden md:flex items-center gap-4">

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={26} />
          </Link>

          {/* Wishlist */}
          <Link href="/favorite" className="relative">
            <Heart size={26} />
          </Link>

          {/* If user logged in (custom / social) */}
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user?.image || user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle button */}
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
              className={`${isActiveRoute("/") ? activeClass : inactiveClass}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/partner"
              onClick={() => setOpen(false)}
              className={`${isActiveRoute("/partner") ? activeClass : inactiveClass}`}
            >
              Partner
            </Link>
          </li>
          <li>
            <Link
              href="/allFood"
              onClick={() => setOpen(false)}
              className={`${isActiveRoute("/allFood") ? activeClass : inactiveClass}`}
            >
              AllFood
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`${isActiveRoute("/contact") ? activeClass : inactiveClass}`}
            >
              Contact
            </Link>
          </li>

          {/* Mobile Auth Section */}
          <div className="pt-4 border-t flex items-center justify-between">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={user?.image || user?.photoURL}
                    className="w-10 h-10 rounded-full border"
                  />
                  <p>{user.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        </ul>
      )}
    </nav>
  );
}
