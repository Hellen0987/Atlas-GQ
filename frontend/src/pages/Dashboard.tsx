import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-primary">Atlas Gestão</h2>
          <nav className="space-x-4">
            <Link to="/products" className="text-gray-600">Produtos</Link>
          </nav>
        </div>
        <div>
          <span className="mr-4">{user?.nome}</span>
          <button className="text-sm text-red-500" onClick={logout}>Sair</button>
        </div>
      </header>
      <main className="p-6">
        <h3 className="text-2xl font-semibold mb-4">Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Receita Mensal: R$ 0,00</div>
          <div className="bg-white p-4 rounded shadow">Total de Produtos: 0</div>
          <div className="bg-white p-4 rounded shadow">Estoque baixo: 0</div>
        </div>
      </main>
    </div>
  );
}
