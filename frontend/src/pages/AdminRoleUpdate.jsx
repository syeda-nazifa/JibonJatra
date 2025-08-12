import React, { useState } from "react";
import { updateUserRole } from "../api";

export default function AdminRoleUpdate() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("resident");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = ["resident", "shopkeeper", "service provider", "homeowner", "admin"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await updateUserRole(userId, role);
      setMessage(res.data.message || "Role updated successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating role");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update User Role</h2>

        <label className="block mb-2 font-medium">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 font-medium">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Role"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
