import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Dashboard() {
  const [produtos, setProdutos] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [totalVendido, setTotalVendido] = useState(0);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const { count: totalProdutos } = await supabase
      .from("produtos")
      .select("*", { count: "exact", head: true });

    const { count: totalClientes } = await supabase
      .from("clientes")
      .select("*", { count: "exact", head: true });

    const { data: vendas } = await supabase
      .from("vendas")
      .select("total");

    const somaVendas =
      vendas?.reduce(
        (total, venda) =>
          total + Number(venda.total || 0),
        0
      ) || 0;

    setProdutos(totalProdutos || 0);
    setClientes(totalClientes || 0);
    setTotalVendido(somaVendas);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h3
        style={{
          color: "#2563eb",
          marginBottom: "10px",
        }}
      >
        Bem-vindo!
      </h3>

      <h1
        style={{
          fontSize: "60px",
          color: "#0f172a",
          marginBottom: "10px",
        }}
      >
        Soares PDV
      </h1>

      <p
        style={{
          color: "#444",
          fontSize: "22px",
          marginBottom: "30px",
        }}
      >
        Resumo geral da sua farmácia
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#10b981",
              marginBottom: "15px",
            }}
          >
            Produtos
          </h2>

          <div
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            {produtos}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#3b82f6",
              marginBottom: "15px",
            }}
          >
            Clientes
          </h2>

          <div
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            {clientes}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#f59e0b",
              marginBottom: "15px",
            }}
          >
            Total Vendido
          </h2>

          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            R$ {totalVendido.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}