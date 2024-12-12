import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [user, setUser] = useState(null);
const navi = useNavigate();
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
        navi("/");
      })
      .catch((error) => {
        toast.error("Sign-out error:", error);
      });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-red-600 text-white">
      <div className="flex-1">
        <img src="logo-placeholder.png" alt="Blood Donation Logo" className="w-32 h-auto" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-2">
        <ul className="flex justify-around space-x-6">
          <li>
            <Link to="/looking-for-blood" className="text-white font-semibold text-lg hover:text-gray-300">
              Looking for Blood
            </Link>
          </li>
          <li>
            <Link to="/giving-blood" className="text-white font-semibold text-lg hover:text-gray-300">
              Giving Blood
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" className="text-white font-semibold text-lg hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white font-semibold text-lg hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" className="text-white font-semibold text-lg hover:text-gray-300">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-white font-semibold text-lg hover:text-gray-300">
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
