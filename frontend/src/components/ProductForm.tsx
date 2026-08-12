import React, { useState } from "react";
import API from "../services/api";

export default function ProductForm({ product, onSaved, onCancel }: any) {
  const [nome, setNome] = useState(product?.nome || "");
  const [estoque, setEstoque] = useState(product?.estoque || 0);
  const [preco_venda, setPrecoVenda] = useState(product?.preco_venda || 0);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData();
    form.append("nome", nome);
    form.append("estoque", String(estoque));
    form.append("preco_venda", String(preco_venda));
    if (file) form.append("imagem", file);
    try {
      if (product) {
        await API.put(`/products/${product.id}`, form, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await API.post(`/products`, form, { headers: { "Content-Type": "multipart/form-data" } });
      }
      onSaved();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Erro ao salvar");
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
        <input className="p-2 border rounded" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
        <input className="p-2 border rounded" type="number" value={estoque} onChange={e => setEstoque(Number(e.target.value))} placeholder="Estoque" />
        <input className="p-2 border rounded" type="number" step="0.01" value={preco_venda} onChange={e => setPrecoVenda(Number(e.target.value))} placeholder="Preço venda" />
        <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Salvar</button>
          <button className="bg-gray-300 px-4 py-2 rounded" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
