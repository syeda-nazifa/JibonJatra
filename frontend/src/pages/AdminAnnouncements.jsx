import { useEffect, useState } from "react";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../api/announcements";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load announcements safely
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getAnnouncements();
      setAnnouncements(res.data || []);
    } catch (err) {
      console.error("Failed to load announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // ✅ No return needed here, prevents destroy errors
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAnnouncement(editingId, form);
      } else {
        await createAnnouncement(form);
      }
      setForm({ title: "", message: "" });
      setEditingId(null);
      await loadData();
    } catch (err) {
      console.error("Failed to save announcement:", err);
    }
  };

  const handleEdit = (a) => {
    setForm({ title: a.title, message: a.message });
    setEditingId(a._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      await loadData();
    } catch (err) {
      console.error("Failed to delete announcement:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Announcements</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="border p-2 w-full rounded mb-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full rounded mb-2"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      {/* Loading indicator */}
      {loading && <p>Loading announcements...</p>}

      {/* List */}
      {announcements.map((a) => (
        <div key={a._id} className="bg-white shadow-md rounded-xl p-4 mb-3 flex justify-between">
          <div>
            <h2 className="font-semibold">{a.title}</h2>
            <p>{a.message}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => handleEdit(a)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(a._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
