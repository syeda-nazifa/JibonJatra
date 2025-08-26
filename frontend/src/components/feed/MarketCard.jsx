// // MarketCard.jsx
// import React from 'react';
// import { getImageUrl } from '../../api/client';

// const MarketCard = ({ item }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-full max-w-md mx-auto">
//       <div className="flex items-center mb-4">
//         <img
//           src={item.createdBy?.profilePicture || '/default-avatar.png'}
//           alt={item.createdBy?.username}
//           className="w-10 h-10 rounded-full mr-3"
//         />
//         <div>
//           <h3 className="font-medium text-gray-900">{item.createdBy?.username}</h3>
//           <p className="text-gray-500 text-sm">Market Price</p>
//         </div>
//       </div>

//       <div className="flex-grow mb-4">
//         {item.image && (
//           <img
//             src={getImageUrl(item.image)}
//             alt={item.name}
//             className="w-full h-64 object-cover rounded-md mb-4"
//             onError={(e) => {
//               e.target.style.display = 'none';
//             }}
//           />
//         )}

//         <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h2>
        
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <p className="text-gray-600 text-sm">Price</p>
//             <p className="text-2xl font-bold text-green-600">৳{item.price}</p>
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Location</p>
//             <p className="font-medium text-gray-900">{item.location}</p>
//           </div>
//         </div>

//         <p className="text-gray-600 text-sm mb-2">
//           <span className="font-medium">Source:</span> {item.source}
//         </p>
//       </div>

//       <div className="mt-auto">
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <span>Posted {new Date(item.createdAt).toLocaleDateString()}</span>
//           <button className="text-blue-600 hover:text-blue-800 font-medium">
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketCard;
// MarketCard.jsx
import React from 'react';
import { getImageUrl } from '../../api/client';

const MarketCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{item.createdBy?.username}</h3>
          <p className="text-gray-500 text-sm">Market Price</p>
        </div>
      </div>

      <div className="flex-grow mb-4">
        {item.image && (
          <img
            src={getImageUrl(item.image)}
            alt={item.name}
            className="w-full h-80 object-cover rounded-md mb-4"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600 text-sm">Price</p>
            <p className="text-2xl font-bold text-green-600">৳{item.price}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Location</p>
            <p className="font-medium text-gray-900">{item.location}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Source:</span> {item.source}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Posted {new Date(item.createdAt).toLocaleDateString()}</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;