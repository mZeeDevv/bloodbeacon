import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [loading, setLoading] = useState(true);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name);
            setEmail(userData.email);
            setBloodGroup(userData.bloodGroup);
          } else {
            toast.error("User data not found");
          }
        } catch (error) {
          toast.error("Failed to fetch user data");
        }
      } else {
        // toast.error("No authenticated user found");
      }
      setLoading(false); // Set loading to false after auth state is checked
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      toast.error("No authenticated user found");
      return;
    }

    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        name,
        bloodGroup,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Profile</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={email}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blood Group</label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="" disabled>Select your blood group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
