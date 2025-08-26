// // import { useState } from "react";

// // export default function RatingModal({ 
// //   isOpen, 
// //   onClose, 
// //   onSubmit, 
// //   userRating,
// //   isSubmitting = false 
// // }) {
// //   const [rating, setRating] = useState(userRating?.rating || 0);
// //   const [comment, setComment] = useState(userRating?.comment || "");
// //   const [hoverRating, setHoverRating] = useState(0);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit({ rating, comment });
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
// //         <h2 className="text-xl font-bold mb-4">
// //           {userRating ? 'Update Your Rating' : 'Rate This Service'}
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {/* Star Rating */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Your Rating
// //             </label>
// //             <div className="flex space-x-1">
// //               {[1, 2, 3, 4, 5].map((star) => (
// //                 <button
// //                   key={star}
// //                   type="button"
// //                   className="focus:outline-none"
// //                   onClick={() => setRating(star)}
// //                   onMouseEnter={() => setHoverRating(star)}
// //                   onMouseLeave={() => setHoverRating(0)}
// //                 >
// //                   <svg
// //                     className={`w-8 h-8 ${
// //                       star <= (hoverRating || rating)
// //                         ? "text-yellow-400"
// //                         : "text-gray-300"
// //                     }`}
// //                     fill="currentColor"
// //                     viewBox="0 0 20 20"
// //                   >
// //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                   </svg>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Comment */}
// //           <div>
// //             <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
// //               Comment (Optional)
// //             </label>
// //             <textarea
// //               id="comment"
// //               rows={3}
// //               value={comment}
// //               onChange={(e) => setComment(e.target.value)}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               placeholder="Share your experience with this service..."
// //               maxLength={500}
// //             />
// //             <p className="text-xs text-gray-500 mt-1">{comment.length}/500 characters</p>
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex space-x-3 pt-4">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={rating === 0 || isSubmitting}
// //               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                   </svg>
// //                   Submitting...
// //                 </>
// //               ) : (
// //                 userRating ? 'Update Rating' : 'Submit Rating'
// //               )}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { fetchServices, deleteServiceAPI, getServiceRatings } from "../api/services";
// import { 
//   fetchServices, 
//   deleteServiceAPI, 
//   getServiceRatings, 
//   getUserRating,        // ✅ add this
//   addServiceRating      // ✅ add this
// } from "../api/services";

// import Rating from "./Rating"; // ADD THIS IMPORT
// import RatingModal from "./RatingModal"; // ADD THIS IMPORT

// export default function ServiceList({ token, user }) {
//   const [services, setServices] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [serviceTypeFilter, setServiceTypeFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [ratings, setRatings] = useState({}); // ADD THIS STATE
//   const [showRatingModal, setShowRatingModal] = useState(false); // ADD THIS STATE
//   const [selectedService, setSelectedService] = useState(null); // ADD THIS STATE
//   const [userRatings, setUserRatings] = useState({}); // ADD THIS STATE
//   const [ratingSubmitting, setRatingSubmitting] = useState(false); // ADD THIS STATE
//   const navigate = useNavigate();

//   const loadServices = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchServices();
//       setServices(res.data.items);
//       setFilteredServices(res.data.items);
      
//       // Load ratings for all services
//       const ratingsData = {};
//       const userRatingsData = {};
      
//       for (const service of res.data.items) {
//         try {
//           const ratingsRes = await getServiceRatings(service._id);
//           ratingsData[service._id] = ratingsRes.data;
          
//           // Load user rating if logged in
//           if (token && user && user.id !== service.createdBy?._id && user.id !== service.createdBy) {
//             try {
//               const userRatingRes = await getUserRating(service._id, token);
//               userRatingsData[service._id] = userRatingRes.data.userRating;
//             } catch (err) {
//               userRatingsData[service._id] = null;
//             }
//           }
//         } catch (err) {
//           ratingsData[service._id] = { averageRating: 0, totalRatings: 0 };
//         }
//       }
      
//       setRatings(ratingsData);
//       setUserRatings(userRatingsData);
//     } catch (err) {
//       console.error("Error loading services:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this service?")) return;
//     try {
//       await deleteServiceAPI(id, token);
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Failed to delete", err);
//       alert("Failed to delete service. Please try again.");
//     }
//   };

//   // ADD RATING HANDLERS
//   const handleRateClick = (service) => {
//     if (!token) {
//       alert("Please login to rate services");
//       navigate("/login");
//       return;
//     }
//     setSelectedService(service);
//     setShowRatingModal(true);
//   };

//   const handleRatingSubmit = async (ratingData) => {
//     if (!selectedService) return;
    
//     setRatingSubmitting(true);
//     try {
//       await addServiceRating(selectedService._id, ratingData, token);
      
//       // Update local state
//       const updatedRatings = { ...ratings };
//       const updatedUserRatings = { ...userRatings };
      
//       updatedUserRatings[selectedService._id] = ratingData;
      
//       // Recalculate average rating
//       const serviceRatings = updatedRatings[selectedService._id] || { averageRating: 0, totalRatings: 0 };
//       const newTotalRatings = serviceRatings.totalRatings + (userRatings[selectedService._id] ? 0 : 1);
//       const newAverageRating = userRatings[selectedService._id] 
//         ? ((serviceRatings.averageRating * serviceRatings.totalRatings) - userRatings[selectedService._id].rating + ratingData.rating) / serviceRatings.totalRatings
//         : ((serviceRatings.averageRating * serviceRatings.totalRatings) + ratingData.rating) / newTotalRatings;
      
//       updatedRatings[selectedService._id] = {
//         averageRating: newAverageRating,
//         totalRatings: newTotalRatings
//       };
      
//       setRatings(updatedRatings);
//       setUserRatings(updatedUserRatings);
//       setShowRatingModal(false);
//       setSelectedService(null);
//     } catch (err) {
//       console.error("Failed to submit rating:", err);
//       alert("Failed to submit rating. Please try again.");
//     } finally {
//       setRatingSubmitting(false);
//     }
//   };

//   // Apply filters and search
//   useEffect(() => {
//     let result = services;
    
//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(s => 
//         s.serviceName.toLowerCase().includes(term) ||
//         s.serviceDetail.toLowerCase().includes(term) ||
//         s.providerName.toLowerCase().includes(term) ||
//         s.location.toLowerCase().includes(term)
//       );
//     }
    
//     // Apply service type filter
//     if (serviceTypeFilter) {
//       const term = serviceTypeFilter.toLowerCase();
//       result = result.filter(s => s.serviceType.toLowerCase().includes(term));
//     }
    
//     // Apply location filter
//     if (locationFilter) {
//       const term = locationFilter.toLowerCase();
//       result = result.filter(s => s.location.toLowerCase().includes(term));
//     }
    
//     setFilteredServices(result);
//   }, [searchTerm, serviceTypeFilter, locationFilter, services]);

//   useEffect(() => {
//     loadServices();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Available Services</h1>
//             <p className="text-gray-600 mt-2">Find the perfect service for your needs</p>
//           </div>
          
//           {user && user.role === "service provider" && (
//             <button
//               onClick={() => navigate("/services/create")}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center mt-4 md:mt-0 transition-colors shadow-md hover:shadow-lg"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Create Service
//             </button>
//           )}
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Search Input */}
//             <div>
//               <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Services</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   id="search"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Search services..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
            
//             {/* Service Type Filter */}
//             <div>
//               <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   id="serviceType"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Filter by type..."
//                   value={serviceTypeFilter}
//                   onChange={(e) => setServiceTypeFilter(e.target.value)}
//                 />
//               </div>
//             </div>
            
//             {/* Location Filter */}
//             <div>
//               <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   id="location"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Filter by location..."
//                   value={locationFilter}
//                   onChange={(e) => setLocationFilter(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Clear Filters Button */}
//           {(searchTerm || serviceTypeFilter || locationFilter) && (
//             <div className="mt-4">
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setServiceTypeFilter("");
//                   setLocationFilter("");
//                 }}
//                 className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//                 Clear all filters
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-gray-600">
//             {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
//             {(searchTerm || serviceTypeFilter || locationFilter) && " matching your criteria"}
//           </p>
//         </div>

//         {/* Services Grid */}
//         {filteredServices.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-4 text-lg font-medium text-gray-900">No services found</h3>
//             <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredServices.map((s) => {
//               const serviceRatings = ratings[s._id] || { averageRating: 0, totalRatings: 0 };
//               const userRating = userRatings[s._id];
//               const canRate = token && user && user.id !== s.createdBy?._id && user.id !== s.createdBy;
              
//               return (
//                 <div key={s._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={s.servicePicture ? `http://localhost:5000${s.servicePicture}` : "/logo.png"}
//                       alt={s.serviceName}
//                       className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                     <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                       {s.serviceType}
//                     </div>
//                   </div>
                  
//                   <div className="p-5 flex-1 flex flex-col">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.serviceName}</h3>
//                     <p className="text-gray-600 mb-4 flex-1">{s.serviceDetail}</p>
                    
//                     {/* ADD RATING COMPONENT */}
//                     <div className="mb-4">
//                       <Rating
//                         averageRating={serviceRatings.averageRating}
//                         totalRatings={serviceRatings.totalRatings}
//                         userRating={userRating}
//                         onRate={() => handleRateClick(s)}
//                         canRate={canRate}
//                       />
//                     </div>
                    
//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <span className="font-medium text-lg text-blue-700">${s.servicePrice}</span>
//                       </div>
                      
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-gray-600">{s.location}</span>
//                       </div>
                      
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                         </svg>
//                         <span className="text-gray-600">{s.providerName}</span>
//                       </div>
                      
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                         </svg>
//                         <span className="text-gray-600">{s.providerContact}</span>
//                       </div>
//                     </div>
                    
//                     {/* Action Buttons */}
//                     {user && (
//                       ((user.role === "service provider" && (user.id === s.createdBy?._id || user.id === s.createdBy)) || 
//                        user.role === "admin")
//                     ) && (
//                       <div className="flex space-x-2 pt-3 border-t border-gray-100">
//                         <button
//                           onClick={() => navigate(`/services/edit/${s._id}`)}
//                           className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center"
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(s._id)}
//                           className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center"
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Rating Modal */}
//       <RatingModal
//         isOpen={showRatingModal}
//         onClose={() => {
//           setShowRatingModal(false);
//           setSelectedService(null);
//         }}
//         onSubmit={handleRatingSubmit}
//         userRating={selectedService ? userRatings[selectedService._id] : null}
//         isSubmitting={ratingSubmitting}
//       />
//     </div>
//   );
// }