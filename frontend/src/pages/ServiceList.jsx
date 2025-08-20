// import { useEffect, useState } from "react";
// import { fetchServices, deleteServiceAPI } from "../api/services";

// export default function ServiceList({ token, user }) {
//   const [services, setServices] = useState([]);

//   const loadServices = async () => {
//     const res = await fetchServices();
//     setServices(res.data.items);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     await deleteServiceAPI(id, token);
//     loadServices();
//   };

//   useEffect(() => {
//     loadServices();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">All Services</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services.map((s) => (
//           <div key={s._id} className="border p-3 rounded shadow">
//             <img
//               src={s.servicePicture || "/logo.png"}
//               alt={s.serviceName}
//               className="w-full h-48 object-cover mb-2"
//             />
//             <h3 className="font-bold">{s.serviceName}</h3>
//             <p>{s.serviceDetail}</p>
//             <p>Price: {s.servicePrice}</p>
//             <p>Type: {s.serviceType}</p>
//             <p>Provider: {s.providerName}</p>
//             <p>Contact: {s.providerContact}</p>
//             <p>Location: {s.location}</p>
//             {(user && (user.role === "admin" || user.id === s.createdBy._id)) && (
//               <div className="flex gap-2 mt-2">
//                 <button
//                   onClick={() => handleDelete(s._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServices, deleteServiceAPI } from "../api/services";

export default function ServiceList({ token, user }) {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();


  const loadServices = async () => {
    try {
      const res = await fetchServices();
      setServices(res.data.items);
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteServiceAPI(id, token);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Services</h2>
      {user && user.role === "service provider" && (
    <div className="mb-4">
      <button
        onClick={() => navigate("/services/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Service
      </button>
    </div>
  )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s._id} className="border p-3 rounded shadow">
            <img
              src={`http://localhost:5000${s.servicePicture}` || "/logo.png"}
              alt={s.serviceName}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold">{s.serviceName}</h3>
            <p>{s.serviceDetail}</p>
            <p>Price: {s.servicePrice}</p>
            <p>Type: {s.serviceType}</p>
            <p>Provider: {s.providerName}</p>
            <p>Contact: {s.providerContact}</p>
            <p>Location: {s.location}</p>
            {user && user.role === "service provider" && (user.id === s.createdBy?._id || user.id === s.createdBy) && (
            <div className="flex gap-2 mt-2">
                <button
                onClick={() => navigate(`/services/edit/${s._id}`)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                Edit
                </button>
                <button
                onClick={() => handleDelete(s._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                Delete
                </button>
            </div>
            )}
        </div>
        ))}
      </div>
    </div>
  );
}
