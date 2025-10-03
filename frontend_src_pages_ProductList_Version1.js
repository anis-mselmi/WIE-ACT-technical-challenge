import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/products").then(res => setProducts(res.data));
  }, []);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      {products.map(p => (
        <Link key={p._id} to={`/products/${p._id}`}>
          <Card title={p.title} subtitle={`by ${p.farmer.name} | ${p.price} TND`} image={p.images[0]}>
            <div>{p.description}</div>
            <div>Qty: {p.quantity} | Status: {p.status}</div>
          </Card>
        </Link>
      ))}
    </div>
  );
}