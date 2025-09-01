import { useEffect, useState, useCallback} from "react";
import { api } from "../apiClient"; // frontend apiClient
import ItemFrom from "../components/ItemFrom";
import ItemCard from "../components/ItemCard";

export default function LostFound() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");      
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUserId = localStorage.getItem("userId"); // logged-in user ID

  // const fetchItems = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get("/api/items", { params: { type, search } });
  //     setItems(data.items || []);
  //   } catch (err) {
  //     console.error("Failed to fetch items:", err);
  //     setItems([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const fetchItems = useCallback(async () => {
  setLoading(true);
  try {
    const { data } = await api.get("/items", { params: { type, search } });
    setItems(data.items || []);
  } catch (err) {
    console.error("Failed to fetch items:", err);
    setItems([]);
  } finally {
    setLoading(false);
  }
}, [type, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreated = (doc) => setItems((prev) => [doc, ...prev]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* <header className="flex justify-end mb-4">
        <button className="bg-red-700 text-white px-4 py-2 rounded">User Profile</button>
      </header> */}

      {/* Create item form */}
      <div className="mb-4 max-w-3xl">
        <ItemFrom onCreated={handleCreated} />
      </div>

      {/* Filters */}
      <form onSubmit={applyFilters} className="flex flex-wrap gap-2 my-4 max-w-3xl">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="border p-2 flex-1 min-w-[120px] rounded"
        />
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
          {loading ? "Loading..." : "Filter"}
        </button>
      </form>

      {/* Items grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && !loading && <p>No items found.</p>}
        {items.map((it) => (
          <ItemCard
            key={it._id}
            item={it}
            onDelete={handleDelete}
            currentUserId={currentUserId} // pass logged-in user
          />
        ))}
      </div>
    </main>
  );
}
