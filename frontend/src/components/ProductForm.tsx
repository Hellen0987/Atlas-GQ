import React, { useState, useEffect } from "react";
import API from "../services/api";

type Product = {
  id?: number;
  nome?: string;
  codigo?: string;
  categoria?: string;
  descricao?: string;
  preco_compra?: number;
  preco_venda?: number;
  estoque?: number;
  estoque_min?: number;
  status?: string;
};

interface ProductFormProps {
  product?: Product | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSaved, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<Product>(
    product || {
      nome: "",
      codigo: "",
      categoria: "",
      descricao: "",
      preco_compra: 0,
      preco_venda: 0,
      estoque: 0,
      estoque_min: 0,
      status: "ativo",
    }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) {
        await API.put(`/products/${form.id}`, form);
      } else {
        await API.post("/products", form);
      }
      onSaved();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {form.id ? "Editar Produto" : "Novo Produto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold">Nome *</label>
            <input
              type="text"
              value={form.nome || ""}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Código</label>
            <input
              type="text"
              value={form.codigo || ""}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Categoria</label>
            <input
              type="text"
              value={form.categoria || ""}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Descrição</label>
            <textarea
              value={form.descricao || ""}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold">Preço Compra</label>
              <input
                type="number"
                step="0.01"
                value={form.preco_compra || 0}
                onChange={(e) =>
                  setForm({ ...form, preco_compra: parseFloat(e.target.value) || 0 })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Preço Venda</label>
              <input
                type="number"
                step="0.01"
                value={form.preco_venda || 0}
                onChange={(e) =>
                  setForm({ ...form, preco_venda: parseFloat(e.target.value) || 0 })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold">Estoque</label>
              <input
                type="number"
                value={form.estoque || 0}
                onChange={(e) =>
                  setForm({ ...form, estoque: parseInt(e.target.value) || 0 })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Estoque Mín.</label>
              <input
                type="number"
                value={form.estoque_min || 0}
                onChange={(e) =>
                  setForm({ ...form, estoque_min: parseInt(e.target.value) || 0 })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold">Status</label>
            <select
              value={form.status || "ativo"}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
