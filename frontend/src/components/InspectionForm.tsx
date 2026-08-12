import React, { useState, useEffect } from "react";
import API from "../services/api";

type Inspection = {
  id?: number;
  produtoId?: number;
  lote?: string;
  responsavel?: string;
  resultado?: string;
  conforme?: boolean;
  descricao?: string;
  acaoCorretiva?: string;
  status?: string;
};

interface InspectionFormProps {
  inspection?: Inspection | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function InspectionForm({ inspection, onSaved, onCancel }: InspectionFormProps) {
  const [form, setForm] = useState<Inspection>(
    inspection || {
      lote: "",
      responsavel: "",
      resultado: "",
      conforme: false,
      descricao: "",
      acaoCorretiva: "",
      status: "aberto"
    }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inspection) setForm(inspection);
  }, [inspection]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) {
        await API.put(`/inspections/${form.id}`, form);
      } else {
        await API.post("/inspections", form);
      }
      onSaved();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Erro ao salvar inspeção");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {form.id ? "Editar Inspeção" : "Nova Inspeção"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold">Lote *</label>
            <input
              type="text"
              value={form.lote || ""}
              onChange={(e) => setForm({ ...form, lote: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Responsável</label>
            <input
              type="text"
              value={form.responsavel || ""}
              onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Resultado</label>
            <input
              type="text"
              value={form.resultado || ""}
              onChange={(e) => setForm({ ...form, resultado: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Descrição</label>
            <textarea
              value={form.descricao || ""}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Ação Corretiva</label>
            <textarea
              value={form.acaoCorretiva || ""}
              onChange={(e) => setForm({ ...form, acaoCorretiva: e.target.value })}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-semibold">Conforme?</label>
              <select
                value={form.conforme ? "sim" : "nao"}
                onChange={(e) => setForm({ ...form, conforme: e.target.value === "sim" })}
                className="w-full p-2 border rounded"
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold">Status</label>
              <select
                value={form.status || "aberto"}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="aberto">Aberto</option>
                <option value="fechado">Fechado</option>
              </select>
            </div>
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
