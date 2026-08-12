import React, { useEffect, useState } from "react";
import API from "../services/api";
import InspectionForm from "../components/InspectionForm";

type Inspection = {
  id: number;
  lote?: string;
  responsavel?: string;
  resultado?: string;
  conforme: boolean;
  status: string;
  data: string;
};

export default function Inspections() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [editing, setEditing] = useState<Inspection | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function fetch() {
    try {
      const res = await API.get("/inspections");
      setInspections(res.data);
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
        <h2 className="text-xl font-semibold">Inspeções de Qualidade</h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Nova Inspeção
        </button>
      </div>

      {showForm && (
        <InspectionForm
          inspection={editing}
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
              <th className="p-2 text-left">Lote</th>
              <th className="p-2 text-left">Responsável</th>
              <th className="p-2 text-left">Resultado</th>
              <th className="p-2 text-left">Conforme</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.lote || "N/A"}</td>
                <td className="p-2">{i.responsavel || "N/A"}</td>
                <td className="p-2">{i.resultado || "N/A"}</td>
                <td className="p-2">
                  <span className={i.conforme ? "text-green-600" : "text-red-600"}>
                    {i.conforme ? "✓ Sim" : "✗ Não"}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${i.status === "aberto" ? "bg-yellow-500" : "bg-green-600"}`}>
                    {i.status}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    className="mr-2 text-blue-600"
                    onClick={() => {
                      setEditing(i);
                      setShowForm(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600"
                    onClick={async () => {
                      if (confirm("Deletar?")) {
                        await API.delete(`/inspections/${i.id}`);
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
