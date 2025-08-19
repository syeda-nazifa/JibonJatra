import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ItemFrom from "./components/ItemFrom";  // 👈 matches file + component name
import ItemCard from "./components/ItemCard";
import { api } from "./api/client";

export default function LostFound() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");      
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/items", { params: { type, search } });
      setItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch items:", err);
      setItems([
        { _id: "1", title: "Lost Dog", description: "Brown dog in park", type: "lost", image: null }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreated = (doc) => setItems((prev) => [doc, ...prev]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/items/${id}`);
      setItems((prev) => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const applyFilters = async (e) => {
    e?.preventDefault();
    await fetchItems();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <header className="flex justify-end mb-4">
          <button className="bg-red-700 text-white px-4 py-2 rounded">User Profile</button>
        </header>

        <ItemFrom onCreated={handleCreated} />   {/* 👈 updated */}

        <form onSubmit={applyFilters} className="flex gap-2 my-4">
          <select value={type} onChange={(e)=>setType(e.target.value)} className="border p-2">
            <option value="">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search…"
            className="border p-2 flex-1"
          />
          <button className="bg-gray-800 text-white px-4 rounded">
            {loading ? "Loading..." : "Filter"}
          </button>
        </form>

        <div className="grid gap-3">
          {items.length === 0 && !loading && <p>No items found.</p>}
          {items.map((it) => (
            <ItemCard key={it._id} item={it} onDelete={handleDelete} />
          ))}
        </div>
      </main>
    </div>
  );
}
