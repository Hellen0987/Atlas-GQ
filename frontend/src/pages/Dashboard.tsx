import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import API from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalProducts: 0, totalSales: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await API.get("/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">Bem-vindo, {user?.nome}! 👋</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
          <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Total de Produtos</div>
          <div className="text-3xl font-bold text-primary">{stats.totalProducts}</div>
        </div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
          <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Total de Vendas</div>
          <div className="text-3xl font-bold text-green-600">{stats.totalSales}</div>
        </div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-red-500">
          <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Estoque Baixo</div>
          <div className="text-3xl font-bold text-red-600">{stats.lowStock}</div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded">
        <h4 className="font-semibold text-blue-900 mb-2">📋 Próximos Passos</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Gerenciar Produtos - Adicione, edite e remova produtos do catálogo</li>
          <li>✓ Registrar Vendas - Acompanhe todas as transações de vendas</li>
          <li>✓ Inspeções de Qualidade - Registre inspeções e controle de conformidade</li>
          <li>✓ Relatórios - Acompanhe métricas importantes da sua gestão</li>
        </ul>
      </div>
    </div>
  );
}
