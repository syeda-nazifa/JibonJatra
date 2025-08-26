// // ProductCard.jsx
// import React from 'react';
// import { getImageUrl } from '../../api/client';
// const ProductCard = ({ product }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 max-w-md mx-auto">
//       <div className="flex items-center mb-4">
//         {/* <img
//           src={product.owner?.profilePicture || '/default-avatar.png'}
//           alt={product.owner?.username}
//           className="w-10 h-10 rounded-full mr-3"
//         /> */}
//         <div>
//           <h3 className="font-medium text-gray-900">{product.owner?.username}</h3>
//           <p className="text-gray-500 text-sm">Product</p>
//         </div>
//       </div>

//       {product.imageUrl && (
//   <img
//     src={getImageUrl(product.imageUrl)}
//     alt={product.name}
//     className="w-full h-64 object-cover rounded-md mb-4"
//     onError={(e) => {
//       e.target.style.display = 'none'; // Hide broken images
//       console.log('Failed to load product image:', product.imageUrl);
//     }}
//   />
// )}

//       <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
      
//       <p className="text-gray-700 mb-4">{product.description}</p>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <p className="text-gray-600 text-sm">Price</p>
//           <p className="text-2xl font-bold text-green-600">৳{product.price}</p>
//         </div>
//         <div>
//           <p className="text-gray-600 text-sm">Shop</p>
//           <p className="font-medium text-gray-900">{product.shopName}</p>
//         </div>
//       </div>

//       <p className="text-gray-600 text-sm mb-4">
//         <span className="font-medium">Location:</span> {product.shopLocation}
//       </p>

//       <div className="flex items-center justify-between">
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           product.inStock 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-red-100 text-red-800'
//         }`}>
//           {product.inStock ? 'In Stock' : 'Out of Stock'}
//         </span>
        
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
//           Contact Seller
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// ProductCard.jsx
import React from 'react';
import { getImageUrl } from '../../api/client';
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{product.owner?.username}</h3>
          <p className="text-gray-500 text-sm">Product</p>
        </div>
      </div>

      {product.imageUrl && (
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          className="w-full h-80 object-cover rounded-md mb-4"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
      
      <p className="text-gray-700 mb-4">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm">Price</p>
          <p className="text-2xl font-bold text-green-600">৳{product.price}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Shop</p>
          <p className="font-medium text-gray-900">{product.shopName}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        <span className="font-medium">Location:</span> {product.shopLocation}
      </p>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          product.inStock 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default ProductCard;