import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductForm from "../components/ProductForm";

type Product = {
  id: number;
  nome: string;
  estoque: number;
  preco_venda?: number;
  imagem?: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function fetch() {
    const res = await API.get("/products");
    setProducts(res.data);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Produtos</h2>
        <div>
          <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => { setEditing(null); setShowForm(true); }}>
            Novo Produto
          </button>
        </div>
      </div>

      {showForm && <ProductForm product={editing} onSaved={() => { setShowForm(false); fetch(); }} onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Estoque</th>
              <th className="p-2 text-left">Preço</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.nome}</td>
                <td className="p-2">{p.estoque}</td>
                <td className="p-2">R$ {p.preco_venda?.toFixed(2) || "0,00"}</td>
                <td className="p-2">
                  <button className="mr-2 text-blue-600" onClick={() => { setEditing(p); setShowForm(true); }}>Editar</button>
                  <button className="text-red-600" onClick={async () => { if (confirm("Deletar?")) { await API.delete(`/products/${p.id}`); fetch(); } }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
