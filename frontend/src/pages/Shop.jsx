import React, { useEffect, useState } from "react";
import api from "../api";

const Shop = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    shopName: user?.shopName || "",
    shopLocation: user?.shopLocation || "",
    imageUrl: ""
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/products", newProduct);
      setProducts([...products, res.data]);
      setNewProduct({
        name: "",
        price: "",
        shopName: user?.shopName || "",
        shopLocation: user?.shopLocation || "",
        imageUrl: ""
      });
    } catch {
      alert("Add failed");
    }
  };

  const handleEdit = async (id) => {
    try {
      await api.put(`/api/products/${id}`, { price: editPrice });
      setProducts(products.map(p => p._id === id ? { ...p, price: editPrice } : p));
      setEditProductId(null);
      setEditPrice("");
    } catch {
      alert("Edit failed");
    }
  };

  const visibleProducts = user?.role === "shopkeeper"
    ? products.filter(p => p.owner._id === user._id)
    : products;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Shop</h1>
      {loading && <p>Loading products...</p>}
      {visibleProducts.length === 0 && !loading && <p>No products available.</p>}

      {user?.role === "shopkeeper" && (
        <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Shop Location"
            value={newProduct.shopLocation}
            onChange={e => setNewProduct({ ...newProduct, shopLocation: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
        </form>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {visibleProducts.map(p => (
          <div key={p._id} className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">{p.name}</h3>
            <p className="text-gray-700 mb-2">Price: {p.price}</p>
            <p className="text-gray-700 mb-2">Shop: {p.shopName}</p>
            <p className="text-gray-700 mb-2">Location: {p.shopLocation}</p>
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover rounded mb-2" />}

            {user?.role === "admin" && (
              <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-3 py-1 rounded mt-2">Delete</button>
            )}

            {user?.role === "shopkeeper" && p.owner._id === user._id && (
              <div className="mt-2">
                {editProductId === p._id ? (
                  <form onSubmit={e => { e.preventDefault(); handleEdit(p._id); }}>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={e => setEditPrice(e.target.value)}
                      className="border px-2 py-1 mr-2 rounded"
                      required
                    />
                    <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                    <button type="button" onClick={() => setEditProductId(null)} className="ml-2">Cancel</button>
                  </form>
                ) : (
                  <button
                    onClick={() => { setEditProductId(p._id); setEditPrice(p.price); }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit Price
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;