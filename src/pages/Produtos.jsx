import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*");

      if (error) {
        console.error("Erro:", error);
      } else {
        console.log(data);
        setProdutos(data);
      }
    }

    carregarProdutos();
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "25px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          color: "#0c8a55",
          marginBottom: "5px",
        }}
      >
        Produtos
      </h1>

      <p
        style={{
          color: "#777",
          marginBottom: "20px",
        }}
      >
        Gerencie os produtos da sua farmácia
      </p>

      <div
        style={{
          background: "#f5f7f6",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#0c8a55",
        }}
      >
        Total de produtos: {produtos.length}
      </div>

      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={`/${produto.foto}`}
            alt={produto.nome}
            onError={(e) => {
              e.target.src = "/sem-foto.png";
            }}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />

          <div>
            <h2
              style={{
                color: "#0c8a55",
                marginBottom: "10px",
              }}
            >
              {produto.nome}
            </h2>

            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#444",
                margin: "5px 0",
              }}
            >
              💵 Custo: R$ {produto.custo}
            </p>

            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0c8a55",
                margin: "5px 0",
              }}
            >
              💰 Venda: R$ {produto.venda}
            </p>

            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                margin: "5px 0",
              }}
            >
              📦 Estoque: {produto.estoque} unidades
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}