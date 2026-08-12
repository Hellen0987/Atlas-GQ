import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Inspections from "./pages/Inspections";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./styles/index.css";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = window.location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-primary">📊 Atlas Gestão</h2>
          <nav className="space-x-4 flex">
            <a
              href="/"
              className={`px-3 py-1 rounded ${
                pathname === "/" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </a>
            <a
              href="/products"
              className={`px-3 py-1 rounded ${
                pathname === "/products" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Produtos
            </a>
            <a
              href="/sales"
              className={`px-3 py-1 rounded ${
                pathname === "/sales" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Vendas
            </a>
            <a
              href="/inspections"
              className={`px-3 py-1 rounded ${
                pathname === "/inspections"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Inspeções
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">👤 {user?.nome}</span>
          <button className="text-sm text-red-500 hover:text-red-700" onClick={logout}>
            Sair
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {token && (
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
                  <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />
                  <Route
                    path="/inspections"
                    element={<PrivateRoute><Inspections /></PrivateRoute>}
                  />
                </Routes>
              </Layout>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
