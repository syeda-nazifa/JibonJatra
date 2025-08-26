// export default function ItemCard({ item, onDelete, currentUserId }) {
//   const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

//   return (
//     <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
//       {item.image && (
//         <img
//           src={`${API_BASE}${item.image}`}
//           className="w-24 h-24 object-cover rounded"
//           alt={item.title}
//         />
//       )}
//       <div className="flex-1">
//         <p className="text-xs font-semibold text-gray-500">{item.type.toUpperCase()}</p>
//         <p className="font-semibold">{item.title}</p>
//         <p className="text-sm">{item.description}</p>
//         {item.location && <p className="text-xs text-gray-600 mt-1">📍 {item.location}</p>}
//         {item.contact && <p className="text-xs text-gray-600">☎ {item.contact}</p>}
//       </div>
//       {/* Only show delete button if current user is the uploader */}
//       {currentUserId && currentUserId === item.user && (
//         <button
//           onClick={() => onDelete?.(item._id)}
//           className="text-red-600 text-sm hover:underline"
//         >
//           Delete
//         </button>
//       )}
//     </div>
//   );
// }

// ItemCard.jsx (for Lost and Found page)
import React from 'react';
import { getImageUrl } from '../api/client'; // Import the getImageUrl function

export default function ItemCard({ item, onDelete, currentUserId }) {
  const isLost = item.type === 'lost';
  
  // Add debug logging
  console.log('LostFound ItemCard data:', item);
  console.log('Image path:', item.image, 'Full URL:', getImageUrl(item.image));
  
  return (
    <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
      {item.image && (
        <img
          src={getImageUrl(item.image)} // Use getImageUrl function
          className="w-24 h-24 object-cover rounded"
          alt={item.title}
          onError={(e) => {
            e.target.style.display = 'none';
            console.log('Failed to load image:', item.image);
          }}
        />
      )}
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-500">{item.type.toUpperCase()}</p>
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm">{item.description}</p>
        {item.location && <p className="text-xs text-gray-600 mt-1">📍 {item.location}</p>}
        {item.contact && <p className="text-xs text-gray-600">☎ {item.contact}</p>}
      </div>
      {/* Only show delete button if current user is the uploader */}
      {currentUserId && currentUserId === item.user && (
        <button
          onClick={() => onDelete?.(item._id)}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      )}
    </div>
  );
}