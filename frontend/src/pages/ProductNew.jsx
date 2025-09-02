import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Layout from "../components/Layout";
import ProductForm from "../components/ProductForm";

export default function ProductNew() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/profile"); // must be logged in
        setMe(res.data);
        if (res.data.role !== "shopkeeper") navigate("/products");
      } catch {
        navigate("/login");
      }
    };
    load();
  }, [navigate]);

  const create = async (payload) => {
    try {
      await api.post("/api/products", payload);
      navigate("/products");
    } catch (e) {
      alert(e.response?.data?.message || "Create failed");
    }
  };

  if (!me) return null;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <ProductForm onSubmit={create} submitLabel="Create" />
    </Layout>
  );
}