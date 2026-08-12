import React, { useState, useEffect } from "react";
import API from "../services/api";

type Sale = {
  id?: number;
  cliente?: string;
  data?: string;
  valorTotal?: number;
  formaPagamento?: string;
  vendedorId?: number;
  itens?: any[];
};

interface SaleFormProps {
  sale?: Sale | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function SaleForm({ sale, onSaved, onCancel }: SaleFormProps) {
  const [form, setForm] = useState<Sale>(
    sale || {
      cliente: "",
      data: new Date().toISOString().split("T")[0],
      valorTotal: 0,
      formaPagamento: "dinheiro",
      itens: []
    }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sale) setForm(sale);
  }, [sale]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) {
        await API.put(`/sales/${form.id}`, form);
      } else {
        await API.post("/sales", form);
      }
      onSaved();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Erro ao salvar venda");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{form.id ? "Editar Venda" : "Nova Venda"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold">Cliente *</label>
            <input
              type="text"
              value={form.cliente || ""}
              onChange={(e) => setForm({ ...form, cliente: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Data</label>
            <input
              type="date"
              value={form.data?.split("T")[0] || ""}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Valor Total</label>
            <input
              type="number"
              step="0.01"
              value={form.valorTotal || 0}
              onChange={(e) => setForm({ ...form, valorTotal: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Forma de Pagamento</label>
            <select
              value={form.formaPagamento || "dinheiro"}
              onChange={(e) => setForm({ ...form, formaPagamento: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de Crédito</option>
              <option value="debito">Cartão de Débito</option>
              <option value="boleto">Boleto</option>
              <option value="pix">PIX</option>
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
