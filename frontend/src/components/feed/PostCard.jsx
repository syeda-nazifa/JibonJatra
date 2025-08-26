// // PostCard.jsx
// import React from 'react';
// import { getImageUrl } from '../../api/client'; // Add this import

// const PostCard = ({ post }) => {
//   // Check if user exists
//   if (!post.user) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-4 max-w-md mx-auto">
//         <div className="flex items-center mb-4">
//           <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
//             <span className="text-gray-600">?</span>
//           </div>
//           <div>
//             <h3 className="font-medium text-gray-900">Unknown User</h3>
//             <p className="text-gray-500 text-sm">
//               {new Date(post.createdAt).toLocaleDateString()} • {post.category}
//             </p>
//           </div>
//         </div>
        
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
//         <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

//         {post.location && (
//           <p className="text-gray-600 text-sm mb-4">
//             📍 {post.location}
//           </p>
//         )}

//         {post.images && post.images.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
//             {post.images.slice(0, 4).map((image, index) => (
//               <img
//                 key={index}
//                 src={getImageUrl(image)}
//                 alt={`${post.title} ${index + 1}`}
//                 className="w-full h-48 object-cover rounded-md"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   console.log('Failed to load post image:', image);
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <span>Posted {new Date(post.createdAt).toLocaleDateString()}</span>
//           <div className="flex items-center space-x-4">
//             <button className="hover:text-blue-600">❤️ Like</button>
//             <button className="hover:text-blue-600">💬 Comment</button>
//             <button className="hover:text-blue-600">↗️ Share</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 max-w-md mx-auto">
//       <div className="flex items-center mb-4">
//         {/* <img
//           src={post.user?.profilePicture || '/default-avatar.png'}
//           alt={post.user?.username}
//           className="w-10 h-10 rounded-full mr-3"
//         /> */}
//         <div>
//           <h3 className="font-medium text-gray-900">{post.user?.username}</h3>
//           <p className="text-gray-500 text-sm">
//             {new Date(post.createdAt).toLocaleDateString()} • {post.category}
//           </p>
//         </div>
//       </div>

//       <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
//       <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

//       {post.location && (
//         <p className="text-gray-600 text-sm mb-4">
//           📍 {post.location}
//         </p>
//       )}

//       {post.images && post.images.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
//           {post.images.slice(0, 4).map((image, index) => (
//             <img
//               key={index}
//               src={getImageUrl(image)}
//               alt={`${post.title} ${index + 1}`}
//               className="w-full h-48 object-cover rounded-md"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 console.log('Failed to load post image:', image);
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <div className="flex items-center justify-between text-sm text-gray-500">
//         <span>Posted {new Date(post.createdAt).toLocaleDateString()}</span>
//         <div className="flex items-center space-x-4">
//           <button className="hover:text-blue-600">❤️ Like</button>
//           <button className="hover:text-blue-600">💬 Comment</button>
//           <button className="hover:text-blue-600">↗️ Share</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;
// PostCard.jsx
import React from 'react';
import { getImageUrl } from '../../api/client';

const PostCard = ({ post }) => {
  if (!post.user) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
            <span className="text-gray-600">?</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Unknown User</h3>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString()} • {post.category}
            </p>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

        {post.location && (
          <p className="text-gray-600 text-sm mb-4">
            📍 {post.location}
          </p>
        )}

        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {post.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={getImageUrl(image)}
                alt={`${post.title} ${index + 1}`}
                className="w-full h-80 object-cover rounded-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Posted {new Date(post.createdAt).toLocaleDateString()}</span>
          <div className="flex items-center space-x-4">
            <button className="hover:text-blue-600">❤️ Like</button>
            <button className="hover:text-blue-600">💬 Comment</button>
            <button className="hover:text-blue-600">↗️ Share</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{post.user?.username}</h3>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()} • {post.category}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

      {post.location && (
        <p className="text-gray-600 text-sm mb-4">
          📍 {post.location}
        </p>
      )}

      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-1 gap-2 mb-4">
          {post.images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={getImageUrl(image)}
              alt={`${post.title} ${index + 1}`}
              className="w-full h-80 object-cover rounded-md"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Posted {new Date(post.createdAt).toLocaleDateString()}</span>
        <div className="flex items-center space-x-4">
          <button className="hover:text-blue-600">❤️ Like</button>
          <button className="hover:text-blue-600">💬 Comment</button>
          <button className="hover:text-blue-600">↗️ Share</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;