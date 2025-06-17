// src/pages/UploadUsers.tsx
import React from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import usersData from "../datas/users_50.json";

const UploadUsers: React.FC = () => {
  const role = localStorage.getItem("role");

  const handleUpload = async () => {
    try {
      for (const user of usersData) {
        const email = user.email?.toLowerCase();
        if (!email) continue; // Skip if email is missing

        // Assign group and role if not present
        const userWithDefaults = {
          ...user,
          group: user.group || "GRP_Maintenance", // default group
          role: user.role || "Technician", // default role
        };

        // Save to Firestore using email as document ID
        await setDoc(doc(db, "users", email), userWithDefaults);
      }

      alert("✅ 50 users uploaded successfully!");
    } catch (err) {
      console.error("Error uploading users:", err);
      alert("❌ Failed to upload some users.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Users</h2>

      {role === "Admin" ? (
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Upload to Firestore
        </button>
      ) : (
        <p className="text-red-500 font-semibold">
          You do not have permission to upload users.
        </p>
      )}
    </div>
  );
};

export default UploadUsers;
