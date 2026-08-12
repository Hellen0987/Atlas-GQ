import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, senha);
      navigate("/");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Erro ao logar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-primary">Atlas Gestão</h1>
        <label className="block">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <label className="block">Senha</label>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} className="w-full p-2 border rounded mb-6" />
        <button disabled={loading} className="w-full bg-primary text-white py-2 rounded">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
