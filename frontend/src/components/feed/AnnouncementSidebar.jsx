import React from 'react';
import { getImageUrl } from '../../api/client';
import { Link } from 'react-router-dom';

// const AnnouncementSidebar = ({ announcements }) => {
//   if (!announcements || announcements.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-4">
//         <h2 className="text-lg font-semibold text-gray-900 mb-3 text-sm">Announcements</h2>
//         <p className="text-gray-500 text-xs">No announcements at the moment.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6 w-80">
//       <h2 className="text-lg font-semibold text-gray-900 mb-3 text-sm">Announcements 📢</h2>
//       <div className="space-y-3 max-h-96 overflow-y-auto">
//         {announcements.map((announcement) => (
//           <div
//             key={announcement._id}
//             className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
//           >
//             {/* Title */}
//             <h3 className="font-medium text-blue-900 mb-2 text-sm">{announcement.title}</h3>
            
//             {/* Message/Content */}
//             <p className="text-blue-800 text-xs mb-2 whitespace-pre-wrap">{announcement.message}</p>
            
//             {/* Image */}
//             {announcement.image && (
//               <img
//                 src={getImageUrl(announcement.image)}
//                 alt={announcement.title}
//                 className="w-full h-32 object-cover rounded-md mb-2"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                 }}
//               />
//             )}
            
//             {/* Event Date (if available) */}
//             {announcement.eventDate && (
//               <div className="flex items-center mb-1">
//                 <span className="text-blue-700 text-xs font-medium mr-1">📅 Event:</span>
//                 <span className="text-blue-600 text-xs">
//                   {new Date(announcement.eventDate).toLocaleDateString()}
//                 </span>
//               </div>
//             )}
            
//             {/* Location (if available) */}
//             {announcement.location && (
//               <div className="flex items-center mb-1">
//                 <span className="text-blue-700 text-xs font-medium mr-1">📍</span>
//                 <span className="text-blue-600 text-xs">{announcement.location}</span>
//               </div>
//             )}
            
//             {/* Published Date */}
//             <div className="flex items-center mb-1">
//               <span className="text-blue-700 text-xs font-medium mr-1">📝</span>
//               <span className="text-blue-600 text-xs">
//                 {new Date(announcement.publishedDate).toLocaleDateString()}
//               </span>
//             </div>
            
//             {/* Priority Badge */}
//             <div className="flex items-center mb-2">
//               <span className="text-blue-700 text-xs font-medium mr-1">🚨</span>
//               <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                 announcement.priority === 'high' 
//                   ? 'bg-red-100 text-red-800' 
//                   : announcement.priority === 'medium'
//                   ? 'bg-yellow-100 text-yellow-800'
//                   : 'bg-green-100 text-green-800'
//               }`}>
//                 {announcement.priority?.toUpperCase() || 'MEDIUM'}
//               </span>
//             </div>
            
//             {/* Status Badge */}
//             <div className="flex items-center mb-2">
//               <span className="text-blue-700 text-xs font-medium mr-1">Status:</span>
//               <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                 announcement.isActive 
//                   ? 'bg-green-100 text-green-800' 
//                   : 'bg-gray-100 text-gray-800'
//               }`}>
//                 {announcement.isActive ? 'ACTIVE' : 'INACTIVE'}
//               </span>
//             </div>
            
//             {/* Author and Creation Date */}
//             <div className="flex items-center justify-between text-xs text-blue-600 border-t border-blue-200 pt-2">
//               <span>By {announcement.createdBy?.username || 'Admin'}</span>
//               <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
//             </div>
            
//             {/* Updated At (if different from created) */}
//             {announcement.updatedAt && announcement.updatedAt !== announcement.createdAt && (
//               <div className="text-xs text-blue-500 text-right mt-1">
//                 Updated: {new Date(announcement.updatedAt).toLocaleDateString()}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnnouncementSidebar;

const AnnouncementSidebar = ({ announcements }) => {
  if (!announcements || announcements.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 ">Announcements</h2>
          <Link 
            to="/announcements" 
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            See All
          </Link>
        </div>
        <p className="text-gray-500 text-xs">No announcements at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6 w-80">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900 ">Announcements 📢</h2>
        <Link 
          to="/announcements" 
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          See All
        </Link>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
          >
            {/* Title */}
            <h3 className="font-medium text-blue-900 mb-2 text-sm">{announcement.title}</h3>
            
            {/* Message/Content */}
            <p className="text-blue-800 text-xs mb-2 whitespace-pre-wrap">{announcement.message}</p>
            
            {/* Image */}
            {announcement.image && (
              <img
                src={getImageUrl(announcement.image)}
                alt={announcement.title}
                className="w-full h-32 object-cover rounded-md mb-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            
            {/* Event Date (if available) */}
            {announcement.eventDate && (
              <div className="flex items-center mb-1">
                <span className="text-blue-700 text-xs font-medium mr-1">📅 Event:</span>
                <span className="text-blue-600 text-xs">
                  {new Date(announcement.eventDate).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {/* Location (if available) */}
            {announcement.location && (
              <div className="flex items-center mb-1">
                <span className="text-blue-700 text-xs font-medium mr-1">📍</span>
                <span className="text-blue-600 text-xs">{announcement.location}</span>
              </div>
            )}
            
            {/* Published Date */}
            <div className="flex items-center mb-1">
              <span className="text-blue-700 text-xs font-medium mr-1">📝</span>
              <span className="text-blue-600 text-xs">
                {new Date(announcement.publishedDate).toLocaleDateString()}
              </span>
            </div>
            
            {/* Priority Badge */}
            <div className="flex items-center mb-2">
              <span className="text-blue-700 text-xs font-medium mr-1">🚨</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                announcement.priority === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : announcement.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {announcement.priority?.toUpperCase() || 'MEDIUM'}
              </span>
            </div>
            
            {/* Status Badge */}
            <div className="flex items-center mb-2">
              <span className="text-blue-700 text-xs font-medium mr-1">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                announcement.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {announcement.isActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            
            {/* Author and Creation Date */}
            <div className="flex items-center justify-between text-xs text-blue-600 border-t border-blue-200 pt-2">
              <span>By {announcement.createdBy?.username || 'Admin'}</span>
              <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
            </div>
            
            {/* Updated At (if different from created) */}
            {announcement.updatedAt && announcement.updatedAt !== announcement.createdAt && (
              <div className="text-xs text-blue-500 text-right mt-1">
                Updated: {new Date(announcement.updatedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSidebar;