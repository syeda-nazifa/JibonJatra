import { useState } from "react";
import { api } from "../apiClient";

export default function ItemFrom({ onCreated }) {
  const [type, setType] = useState("lost");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("type", type);
      fd.append("title", title);
      fd.append("description", description);
      fd.append("location", location);
      fd.append("contact", contact);
      if (image) fd.append("image", image);

      const token = localStorage.getItem("token");
      const { data } = await api.post("/items", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      onCreated?.(data);

      setTitle("");
      setDescription("");
      setLocation("");
      setContact("");
      setImage(null);
    } catch (err) {
      console.error("Failed to create item:", err.response?.data || err);
      alert("Failed to create item");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="bg-white p-4 rounded shadow flex flex-wrap gap-3 items-start" onSubmit={submit}>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2" />
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-2 flex-1 min-w-[120px]" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 flex-[2] min-w-[150px]" required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="border p-2 min-w-[120px]" />
      <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact (optional)" className="border p-2 min-w-[120px]" />
      <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2">
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>
      <button disabled={busy} className="bg-red-600 text-white px-4 py-2 rounded">
        {busy ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
