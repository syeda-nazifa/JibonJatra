// import { useState, useEffect } from "react";
// import { fetchService, updateServiceAPI } from "../api/services";
// import { useParams, useNavigate } from "react-router-dom";

// export default function ServiceEdit({ token }) {
//   const { id } = useParams();
//   const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const load = async () => {
//       const res = await fetchService(id);
//       setForm(res.data);
//     };
//     load();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setForm({ ...form, [name]: files[0] });
//     else setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(form).forEach((key) => data.append(key, form[key]));
//     await updateServiceAPI(id, data, token);
//     navigate("/services");
//   };

//   if (!form.serviceName) return <p>Loading...</p>;

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <input type="text" name="providerName" value={form.providerName} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="text" name="serviceName" value={form.serviceName} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="number" name="servicePrice" value={form.servicePrice} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="text" name="serviceType" value={form.serviceType} onChange={handleChange} className="border p-2 rounded" required />
//         <textarea name="serviceDetail" value={form.serviceDetail} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="text" name="providerContact" value={form.providerContact} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="text" name="location" value={form.location} onChange={handleChange} className="border p-2 rounded" required />
//         <input type="file" name="servicePicture" onChange={handleChange} className="border p-2 rounded" />
//         <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Update</button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { fetchService, updateServiceAPI } from "../api/services";
import { useParams, useNavigate } from "react-router-dom";

export default function ServiceEdit({ token }) {
  const { id } = useParams();
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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchService(id);
        // Only take the fields you want to edit
        const data = res.data;
        setForm({
          providerName: data.providerName || "",
          serviceName: data.serviceName || "",
          servicePrice: data.servicePrice || "",
          serviceType: data.serviceType || "",
          serviceDetail: data.serviceDetail || "",
          providerContact: data.providerContact || "",
          location: data.location || "",
          servicePicture: null, // keep file null initially
        });
      } catch (err) {
        console.error("Failed to load service:", err);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("providerName", form.providerName);
      data.append("serviceName", form.serviceName);
      data.append("servicePrice", Number(form.servicePrice)); // convert to number
      data.append("serviceType", form.serviceType);
      data.append("serviceDetail", form.serviceDetail);
      data.append("providerContact", form.providerContact);
      data.append("location", form.location);
      if (form.servicePicture instanceof File) {
        data.append("servicePicture", form.servicePicture);
      }

      await updateServiceAPI(id, data, token);
      navigate("/services");
    } catch (err) {
      console.error("Failed to update service:", err);
    }
  };

  if (!form.serviceName) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="providerName"
          value={form.providerName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="serviceName"
          value={form.serviceName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="servicePrice"
          value={form.servicePrice}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="serviceDetail"
          value={form.serviceDetail}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="providerContact"
          value={form.providerContact}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
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
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded mt-2"
        >
          Update
        </button>
      </form>
    </div>
  );
}
