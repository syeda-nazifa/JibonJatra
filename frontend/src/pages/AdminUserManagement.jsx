

// import React, { useEffect, useState } from "react";
// import { getUsers, updateUserRole, deleteUser } from "../api";
// import { User, Users, Trash2, Shield, Wrench, Home, ShoppingBag } from "lucide-react";

// export default function AdminUserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const roles = ["resident", "shopkeeper", "service provider", "homeowner", "admin"];

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await getUsers();
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleRoleChange = async (userId, role) => {
//     try {
//       await updateUserRole(userId, role);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await deleteUser(userId);
//       setUsers(users.filter((u) => u._id !== userId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading)
//     return <p className="p-4 text-center text-gray-600">Loading users...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-start p-6 relative overflow-hidden">
      
//       {/* Floating background icons */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute animate-bounce top-10 left-10 opacity-20">
//           <User size={40} className="text-blue-300" />
//         </div>
//         <div className="absolute animate-pulse top-1/4 right-16 opacity-20">
//           <Users size={50} className="text-green-300" />
//         </div>
//         <div className="absolute animate-bounce top-1/2 left-20 opacity-20">
//           <Shield size={35} className="text-yellow-300" />
//         </div>
//         <div className="absolute animate-pulse top-3/4 right-10 opacity-20">
//           <Wrench size={40} className="text-purple-300" />
//         </div>
//         <div className="absolute animate-bounce top-3/5 left-1/2 opacity-20">
//           <ShoppingBag size={35} className="text-pink-300" />
//         </div>
//         <div className="absolute animate-bounce top-3/5 left-1/2 opacity-20">
//           <Home size={35} className="text-pink-300" />
//         </div>
//       </div>

//       {/* Main card */}
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center relative">
//           <div className="absolute inset-0 bg-black opacity-10"></div>
//           <div className="relative z-10">
//             <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
//               <Users className="text-green-600" size={28} />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
//             <p className="text-blue-100">Admin panel to manage all users</p>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="p-8 overflow-x-auto">
//           <table className="min-w-full border rounded-lg overflow-hidden">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-4 py-2 text-left">Name</th>
//                 <th className="border px-4 py-2 text-left">Email</th>
//                 <th className="border px-4 py-2 text-left">Role</th>
//                 <th className="border px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center p-4">
//                     No users found
//                   </td>
//                 </tr>
//               )}
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50 transition-colors">
//                   <td className="border px-4 py-2 flex items-center gap-2">
//                     <User size={18} className="text-gray-500" /> {user.name}
//                   </td>
//                   <td className="border px-4 py-2">{user.email}</td>
//                   <td className="border px-4 py-2">
//                     <select
//                       value={user.role}
//                       onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                       className="border p-1 rounded w-full"
//                     >
//                       {roles.map((r) => (
//                         <option key={r} value={r}>
//                           {r}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border px-4 py-2 flex gap-2">
//                     <button
//                       onClick={() => handleDelete(user._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
//                     >
//                       <Trash2 size={16} /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { getUsers, updateUserRole, deleteUser } from "../api";
import { User, Users, Trash2, Shield, Wrench, Home, ShoppingBag, Search } from "lucide-react";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const roles = ["resident", "shopkeeper", "service provider", "homeowner", "admin"];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = users.filter(user => 
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return <p className="p-4 text-center text-gray-600">Loading users...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-start p-6 relative overflow-hidden">
      
      {/* Floating background icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute animate-bounce top-10 left-10 opacity-20">
          <User size={40} className="text-blue-300" />
        </div>
        <div className="absolute animate-pulse top-1/4 right-16 opacity-20">
          <Users size={50} className="text-green-300" />
        </div>
        <div className="absolute animate-bounce top-1/2 left-20 opacity-20">
          <Shield size={35} className="text-yellow-300" />
        </div>
        <div className="absolute animate-pulse top-3/4 right-10 opacity-20">
          <Wrench size={40} className="text-purple-300" />
        </div>
        <div className="absolute animate-bounce top-3/5 left-1/2 opacity-20">
          <ShoppingBag size={35} className="text-pink-300" />
        </div>
        <div className="absolute animate-bounce top-3/5 left-1/2 opacity-20">
          <Home size={35} className="text-pink-300" />
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Users className="text-green-600" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-blue-100">Admin panel to manage all users</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600 border-b">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
          {searchTerm && ` matching "${searchTerm}"`}
        </div>

        {/* Table */}
        <div className="p-8 overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    {searchTerm ? "No users match your search" : "No users found"}
                  </td>
                </tr>
              )}
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="border px-4 py-2 flex items-center gap-2">
                    <User size={18} className="text-gray-500" /> {user.name}
                  </td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}