import { useState } from "react";
import { createServiceAPI } from "../api/services";
import { useNavigate } from "react-router-dom";

export default function ServiceCreate({ token }) {
  const [form, setForm] = useState({
    providerName: "",
    serviceName: "",
    servicePrice: "",
    serviceType: "",
    serviceDetail: "",
    providerContact: "",
    location: "",
    servicePicture: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    await createServiceAPI(data, token);
    navigate("/services");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Service</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="providerName"
          placeholder="Provider Name"
          value={form.providerName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="serviceName"
          placeholder="Service Name"
          value={form.serviceName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="servicePrice"
          placeholder="Price"
          value={form.servicePrice}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="serviceType"
          placeholder="Type (basic/premium)"
          value={form.serviceType}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="serviceDetail"
          placeholder="Detail"
          value={form.serviceDetail}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="providerContact"
          placeholder="Contact"
          value={form.providerContact}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          name="servicePicture"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
          Create
        </button>
      </form>
    </div>
  );
}
