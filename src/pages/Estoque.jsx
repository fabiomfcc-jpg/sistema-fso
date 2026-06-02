import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("nome");

    setProdutos(data || []);
  }

  const estoqueBaixo = produtos.filter(
    (p) => Number(p.estoque) <= 5
  ).length;

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          color: "#0f172a",
          fontSize: "42px",
          marginBottom: "20px",
        }}
      >
        📦 Controle de Estoque
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total de Produtos</h3>
          <h1>{produtos.length}</h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>⚠️ Estoque Baixo</h3>
          <h1 style={{ color: "red" }}>
            {estoqueBaixo}
          </h1>
        </div>
      </div>

      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            background: "#fff",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "12px",
            border:
              Number(produto.estoque) <= 5
                ? "2px solid #ef4444"
                : "1px solid #ddd",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              color: "#0f766e",
              marginBottom: "10px",
            }}
          >
            {produto.nome}
          </h2>

          <p>
            💲 Custo: R$ {produto.custo}
          </p>

          <p>
            💰 Venda: R$ {produto.venda}
          </p>

          <p
            style={{
              fontWeight: "bold",
              color:
                Number(produto.estoque) <= 5
                  ? "#ef4444"
                  : "#16a34a",
            }}
          >
            📦 Estoque: {produto.estoque}
          </p>

          {Number(produto.estoque) <= 5 && (
            <div
              style={{
                marginTop: "10px",
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "8px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              ⚠️ Repor estoque urgente
            </div>
          )}
        </div>
      ))}
    </div>
  );
}