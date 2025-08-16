// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { Link } from "react-router-dom";

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const { data } = await api.get("/api/posts");
//         setPosts(data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   if (loading) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-8">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Posts</h1>
//         <Link to="/create-post" className="bg-blue-500 text-white px-4 py-2 rounded">
//           New Post
//         </Link>
//       </div>
//       {posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post._id} className="border p-4 rounded mb-4 shadow">
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="text-gray-700">{post.content}</p>
//             <p className="text-sm text-gray-500">
//               Category: {post.category} | Location: {post.location || "N/A"}
//             </p>
//             <Link to={`/posts/${post._id}`} className="text-blue-500 mt-2 block">
//               View Details
//             </Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Posts;

import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Tag } from "lucide-react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/api/posts");
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-center mt-5 text-gray-500 text-lg">Loading posts...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
        <Link
          to="/create-post"
          className="bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">No posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{post.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

              {/* Post details */}
              <div className="flex flex-wrap gap-3 mb-4">
                {post.category && (
                  <span className="flex items-center text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    <Tag size={14} className="mr-1" />
                    {post.category}
                  </span>
                )}
                {post.location && (
                  <span className="flex items-center text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    <MapPin size={14} className="mr-1" />
                    {post.location}
                  </span>
                )}
                {post.createdAt && (
                  <span className="flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    <Calendar size={14} className="mr-1" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              <Link
                to={`/posts/${post._id}`}
                className="text-blue-500 font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
