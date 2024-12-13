import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if logged in, null otherwise
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("User signed out");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Sign-out error:", error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 text-red-600 shadow-lg">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <img src={logo} alt="Blood Donation Logo" className="w-32 h-auto" />
        <button
          className="lg:hidden text-red-600 text-2xl"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`absolute top-16 left-0 w-full bg-white lg:bg-transparent lg:relative lg:top-auto lg:w-auto lg:flex lg:items-center transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 p-4 lg:p-0">
          <li>
            <Link
              to="/looking-for-blood"
              className="text-red-600 font-semibold text-lg hover:text-gray-300"
            >
              Looking for Blood
            </Link>
          </li>
          <li>
            <Link
              to="/giving-blood"
              className="text-red-600 font-semibold text-lg hover:text-gray-300"
            >
              Giving Blood
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold text-lg hover:bg-red-500"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold text-lg hover:bg-red-500"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signup"
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold text-lg hover:bg-red-500"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold text-lg hover:bg-red-500"
                >
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
