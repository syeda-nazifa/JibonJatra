// // import { useEffect, useState } from "react";
// // import { fetchServices, deleteServiceAPI } from "../api/services";

// // export default function ServiceList({ token, user }) {
// //   const [services, setServices] = useState([]);

// //   const loadServices = async () => {
// //     const res = await fetchServices();
// //     setServices(res.data.items);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure?")) return;
// //     await deleteServiceAPI(id, token);
// //     loadServices();
// //   };

// //   useEffect(() => {
// //     loadServices();
// //   }, []);

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl font-bold mb-4">All Services</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {services.map((s) => (
// //           <div key={s._id} className="border p-3 rounded shadow">
// //             <img
// //               src={s.servicePicture || "/logo.png"}
// //               alt={s.serviceName}
// //               className="w-full h-48 object-cover mb-2"
// //             />
// //             <h3 className="font-bold">{s.serviceName}</h3>
// //             <p>{s.serviceDetail}</p>
// //             <p>Price: {s.servicePrice}</p>
// //             <p>Type: {s.serviceType}</p>
// //             <p>Provider: {s.providerName}</p>
// //             <p>Contact: {s.providerContact}</p>
// //             <p>Location: {s.location}</p>
// //             {(user && (user.role === "admin" || user.id === s.createdBy._id)) && (
// //               <div className="flex gap-2 mt-2">
// //                 <button
// //                   onClick={() => handleDelete(s._id)}
// //                   className="bg-red-500 text-white px-2 py-1 rounded"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchServices, deleteServiceAPI } from "../api/services";

// export default function ServiceList({ token, user }) {
//   const [services, setServices] = useState([]);
//   const navigate = useNavigate();


//   const loadServices = async () => {
//     try {
//       const res = await fetchServices();
//       setServices(res.data.items);
//     } catch (err) {
//       console.error("Error loading services:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await deleteServiceAPI(id, token);
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Failed to delete", err);
//     }
//   };

//   useEffect(() => {
//     loadServices();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">All Services</h2>
//       {user && user.role === "service provider" && (
//     <div className="mb-4">
//       <button
//         onClick={() => navigate("/services/create")}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Create Service
//       </button>
//     </div>
//   )}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services.map((s) => (
//           <div key={s._id} className="border p-3 rounded shadow">
//             <img
//               src={`http://localhost:5000${s.servicePicture}` || "/logo.png"}
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
//             {user && user.role === "service provider" && (user.id === s.createdBy?._id || user.id === s.createdBy) && (
//             <div className="flex gap-2 mt-2">
//                 <button
//                 onClick={() => navigate(`/services/edit/${s._id}`)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                 >
//                 Edit
//                 </button>
//                 <button
//                 onClick={() => handleDelete(s._id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                 Delete
//                 </button>
//             </div>
//             )}
//             {user && user.role === "admin" && (
//             <div className="flex gap-2 mt-2">
//                 <button
//                 onClick={() => navigate(`/services/edit/${s._id}`)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                 >
//                 Edit
//                 </button>
//                 <button
//                 onClick={() => handleDelete(s._id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                 Delete
//                 </button>
//             </div>
//             )}
//         </div>
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
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const navigate = useNavigate();

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await fetchServices();
      setServices(res.data.items);
      setFilteredServices(res.data.items);
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteServiceAPI(id, token);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Failed to delete service. Please try again.");
    }
  };

  // Apply filters and search
  useEffect(() => {
    let result = services;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.serviceName.toLowerCase().includes(term) ||
        s.serviceDetail.toLowerCase().includes(term) ||
        s.providerName.toLowerCase().includes(term) ||
        s.location.toLowerCase().includes(term)
      );
    }
    
    // Apply service type filter
    if (serviceTypeFilter) {
      const term = serviceTypeFilter.toLowerCase();
      result = result.filter(s => s.serviceType.toLowerCase().includes(term));
    }
    
    // Apply location filter
    if (locationFilter) {
      const term = locationFilter.toLowerCase();
      result = result.filter(s => s.location.toLowerCase().includes(term));
    }
    
    setFilteredServices(result);
  }, [searchTerm, serviceTypeFilter, locationFilter, services]);

  useEffect(() => {
    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Available Services</h1>
            <p className="text-gray-600 mt-2">Find the perfect service for your needs</p>
          </div>
          
          {user && user.role === "service provider" && (
            <button
              onClick={() => navigate("/services/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center mt-4 md:mt-0 transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Service
            </button>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Services</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Service Type Filter */}
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="serviceType"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Filter by type..."
                  value={serviceTypeFilter}
                  onChange={(e) => setServiceTypeFilter(e.target.value)}
                />
              </div>
            </div>
            
            {/* Location Filter */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="location"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || serviceTypeFilter || locationFilter) && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setServiceTypeFilter("");
                  setLocationFilter("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
            {(searchTerm || serviceTypeFilter || locationFilter) && " matching your criteria"}
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No services found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((s) => (
              <div key={s._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.servicePicture ? `http://localhost:5000${s.servicePicture}` : "/logo.png"}
                    alt={s.serviceName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {s.serviceType}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.serviceName}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{s.serviceDetail}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-lg text-blue-700">${s.servicePrice}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">{s.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-600">{s.providerName}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-600">{s.providerContact}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  {user && (
                    ((user.role === "service provider" && (user.id === s.createdBy?._id || user.id === s.createdBy)) || 
                     user.role === "admin")
                  ) && (
                    <div className="flex space-x-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => navigate(`/services/edit/${s._id}`)}
                        className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}