import React, { useEffect, useState } from "react";
import API from "../services/api";
import SaleForm from "../components/SaleForm";

type Sale = {
  id: number;
  cliente?: string;
  data: string;
  valorTotal: number;
  formaPagamento?: string;
};

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [editing, setEditing] = useState<Sale | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function fetch() {
    try {
      const res = await API.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Vendas</h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Nova Venda
        </button>
      </div>

      {showForm && (
        <SaleForm
          sale={editing}
          onSaved={() => {
            setShowForm(false);
            fetch();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Cliente</th>
              <th className="p-2 text-left">Data</th>
              <th className="p-2 text-left">Valor Total</th>
              <th className="p-2 text-left">Forma Pagamento</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.cliente || "N/A"}</td>
                <td className="p-2">{new Date(s.data).toLocaleDateString()}</td>
                <td className="p-2">R$ {s.valorTotal?.toFixed(2) || "0,00"}</td>
                <td className="p-2">{s.formaPagamento || "N/A"}</td>
                <td className="p-2">
                  <button
                    className="mr-2 text-blue-600"
                    onClick={() => {
                      setEditing(s);
                      setShowForm(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600"
                    onClick={async () => {
                      if (confirm("Deletar?")) {
                        await API.delete(`/sales/${s.id}`);
                        fetch();
                      }
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
