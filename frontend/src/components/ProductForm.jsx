import { useEffect, useState } from "react";

export default function ProductForm({ initial = {}, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    shopName: "",
    shopLocation: "",
    inStock: true,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...initial,
      price: initial.price ?? "",
      inStock: initial.inStock ?? true,
    }));
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-lg mx-auto">
      <input className="w-full border p-2 rounded" name="name" value={form.name}
             onChange={handleChange} placeholder="Product name" required />

      <textarea className="w-full border p-2 rounded" name="description" value={form.description}
                onChange={handleChange} placeholder="Description" rows={3} />

      <input className="w-full border p-2 rounded" name="price" type="number" step="0.01" min="0"
             value={form.price} onChange={handleChange} placeholder="Price" required />

      <input className="w-full border p-2 rounded" name="imageUrl" value={form.imageUrl}
             onChange={handleChange} placeholder="Image URL (https://...)" />

      <input className="w-full border p-2 rounded" name="shopName" value={form.shopName}
             onChange={handleChange} placeholder="Shop name" />

      <input className="w-full border p-2 rounded" name="shopLocation" value={form.shopLocation}
             onChange={handleChange} placeholder="Shop location / address" />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
        <span>In stock</span>
      </label>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {submitLabel}
      </button>
    </form>
  );
}
