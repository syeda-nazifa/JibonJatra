import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Layout from "../components/Layout";
import ProductForm from "../components/ProductForm";

export default function ProductEdit() {
  const { id } = useParams();
  const [me, setMe] = useState(null);
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [meRes, itemRes] = await Promise.all([
          api.get("/api/profile"),
          api.get(`/api/products/${id}`),
        ]);
        setMe(meRes.data);
        setItem(itemRes.data);

        const ownerId = typeof itemRes.data.owner === "object" ? itemRes.data.owner._id : itemRes.data.owner;
        if (meRes.data.role !== "shopkeeper" || ownerId !== meRes.data._id) {
          // Only owner shopkeeper can edit
          navigate("/products");
        }
      } catch {
        navigate("/login");
      }
    };
    load();
  }, [id, navigate]);

  const update = async (payload) => {
    try {
      await api.put(`/api/products/${id}`, payload);
      navigate("/products");
    } catch (e) {
      alert(e.response?.data?.message || "Update failed");
    }
  };

  if (!me || !item) return null;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initial={item} onSubmit={update} submitLabel="Save Changes" />
    </Layout>
  );
}
