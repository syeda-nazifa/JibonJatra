import { useState } from "react";
import { api } from "../api/client";

export default function ItemFrom({ onCreated }) {   // 👈 renamed
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

      const { data } = await api.post("/api/items", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onCreated?.(data);
      setTitle("");
      setDescription("");
      setLocation("");
      setContact("");
      setImage(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow flex gap-3 items-start">
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2" />
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"
             className="border p-2 flex-1" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
             className="border p-2 flex-[2]" required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location"
             className="border p-2" />
      <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact (optional)"
             className="border p-2" />
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
