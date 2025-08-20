import { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";

export default function Products() {
  const [items, setItems] = useState([]);
  const [me, setMe] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    shopName: "",
    shopLocation: "",
    description: "",
    image: null, // for file
  });
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, listRes] = await Promise.all([
          api.get("/api/profile").catch(() => null),
          api.get("/api/products"),
        ]);
        if (profileRes) setMe(profileRes.data);
        setItems(listRes.data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const isOwner = (item) => {
    const ownerId = typeof item.owner === "object" ? item.owner?._id : item.owner;
    return me?._id && ownerId === me._id;
  };

  const canDelete = (item) => me?.role === "admin";
  const canEdit = (item) => me?.role === "shopkeeper" && isOwner(item);

  // Admin delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      setItems((arr) => arr.filter((x) => x._id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  // Shopkeeper add with image
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("shopName", newItem.shopName);
      formData.append("shopLocation", newItem.shopLocation);
      formData.append("description", newItem.description);
      if (newItem.image) formData.append("image", newItem.image);

      const res = await api.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setItems([...items, res.data]);
      setNewItem({ name: "", price: "", shopName: "", shopLocation: "", description: "", image: null });
    } catch (e) {
      alert(e.response?.data?.message || "Add failed");
    }
  };

  // Shopkeeper edit price
  const handleEdit = async (id) => {
    try {
      await api.put(`/api/products/${id}`, { price: editPrice });
      setItems(items.map(item => item._id === id ? { ...item, price: editPrice } : item));
      setEditId(null);
      setEditPrice("");
    } catch (e) {
      alert(e.response?.data?.message || "Update failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">
        {me?.role === "admin"
          ? "Manage Products"
          : me?.role === "shopkeeper"
          ? "Your Shop Products"
          : "Available Products"}
      </h1>

      {/* Shopkeeper: Add new product */}
      {me?.role === "shopkeeper" && (
        <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Product Name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            required
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={e => setNewItem({ ...newItem, price: e.target.value })}
            required
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Shop Name"
            value={newItem.shopName}
            onChange={e => setNewItem({ ...newItem, shopName: e.target.value })}
            required
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Shop Location"
            value={newItem.shopLocation}
            onChange={e => setNewItem({ ...newItem, shopLocation: e.target.value })}
            required
            className="border rounded px-2 py-1"
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setNewItem({ ...newItem, image: e.target.files[0] })}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
        </form>
      )}

      {items.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {items.map((item) => (
            <div key={item._id} className="border rounded p-3 shadow-sm">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded mb-3 grid place-items-center">
                  No image
                </div>
              )}
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-2">
                <strong>Price:</strong> {item.price}
              </p>
              {item.shopName && <p><strong>Shop:</strong> {item.shopName}</p>}
              {item.shopLocation && <p><strong>Location:</strong> {item.shopLocation}</p>}
              {typeof item.owner === "object" && (
                <p className="text-xs text-gray-500 mt-1">Posted by: {item.owner.name}</p>
              )}

              {canDelete(item) && (
                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              )}

              {canEdit(item) && (
                <div className="mt-2">
                  {editId === item._id ? (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleEdit(item._id);
                      }}
                    >
                      <input
                        type="number"
                        value={editPrice}
                        onChange={e => setEditPrice(e.target.value)}
                        className="border rounded px-2 py-1 mr-2"
                        required
                      />
                      <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                      <button type="button" onClick={() => setEditId(null)} className="ml-2">Cancel</button>
                    </form>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(item._id);
                        setEditPrice(item.price);
                      }}
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
      )}
    </Layout>
  );
}
