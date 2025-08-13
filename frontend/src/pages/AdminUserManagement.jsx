import React, { useEffect, useState } from "react";
import { getUsers, updateUserRole, deleteUser } from "../api";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const roles = ["resident", "shopkeeper", "service provider", "homeowner", "admin"];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      console.log("Users fetched:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin User Management</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
