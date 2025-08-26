// // ItemCard.jsx
// import React from 'react';
// import { getImageUrl } from '../../api/client';
// const ItemCard = ({ item }) => {
//   const isLost = item.type === 'lost';
  
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 max-w-md mx-auto">
//       <div className="flex items-center mb-4">
//         {/* <img
//           src={item.user?.profilePicture || '/default-avatar.png'}
//           alt={item.user?.username}
//           className="w-10 h-10 rounded-full mr-3"
//         /> */}
//         <div>
//           <h3 className="font-medium text-gray-900">{item.user?.username}</h3>
//           <p className="text-gray-500 text-sm">
//             {isLost ? 'Lost Item' : 'Found Item'}
//           </p>
//         </div>
//       </div>

//       {item.image && (
//   <img
//     src={getImageUrl(item.image)}
//     alt={item.title}
//     className="w-full h-64 object-cover rounded-md mb-4"
//     onError={(e) => {
//       e.target.style.display = 'none'; // Hide broken images
//       console.log('Failed to load item image:', item.image);
//     }}
//   />
// )}

//       <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
      
//       <p className="text-gray-700 mb-4">{item.description}</p>

//       {item.location && (
//         <p className="text-gray-600 text-sm mb-2">
//           📍 {item.location}
//         </p>
//       )}

//       {item.contact && (
//         <p className="text-gray-600 text-sm mb-4">
//           📞 {item.contact}
//         </p>
//       )}

//       <div className="flex items-center justify-between">
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           isLost 
//             ? 'bg-red-100 text-red-800' 
//             : 'bg-green-100 text-green-800'
//         }`}>
//           {isLost ? 'LOST' : 'FOUND'}
//         </span>
        
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
//           Contact
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ItemCard;
// ItemCard.jsx
import React from 'react';
import { getImageUrl } from '../../api/client';
const ItemCard = ({ item }) => {
  const isLost = item.type === 'lost';
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{item.user?.username}</h3>
          <p className="text-gray-500 text-sm">
            {isLost ? 'Lost Item' : 'Found Item'}
          </p>
        </div>
      </div>

      {item.image && (
        <img
          src={getImageUrl(item.image)}
          alt={item.title}
          className="w-full h-80 object-cover rounded-md mb-4"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
      
      <p className="text-gray-700 mb-4">{item.description}</p>

      {item.location && (
        <p className="text-gray-600 text-sm mb-2">
          📍 {item.location}
        </p>
      )}

      {item.contact && (
        <p className="text-gray-600 text-sm mb-4">
          📞 {item.contact}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isLost 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {isLost ? 'LOST' : 'FOUND'}
        </span>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Contact
        </button>
      </div>
    </div>
  );
};

export default ItemCard;