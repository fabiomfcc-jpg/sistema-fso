import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    const { data, error } = await supabase
      .from("clientes")
      .select("*");

    console.log("DADOS:", data);
    console.log("ERRO:", error);

    if (!error) {
      setClientes(data || []);
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h1
        style={{
          color: "#0c8a55",
          fontSize: "40px",
          marginBottom: "20px",
        }}
      >
        Clientes
      </h1>

      <div
        style={{
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        Total de clientes: {clientes.length}
      </div>

      {clientes.map((cliente) => (
        <div
          key={cliente.id}
          style={{
            background: "#f8f8f8",
            border: "1px solid #cccccc",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "15px",
          }}
        >
          <h2
            style={{
              color: "#0c8a55",
              marginBottom: "10px",
              fontSize: "24px",
            }}
          >
            {cliente.nome}
          </h2>

          <p
            style={{
              color: "#000000",
              fontSize: "16px",
              margin: "5px 0",
            }}
          >
            📞 Telefone: {cliente.telefone}
          </p>

          <p
            style={{
              color: "#000000",
              fontSize: "16px",
              margin: "5px 0",
            }}
          >
            🪪 CPF: {cliente.cpf}
          </p>

          <p
            style={{
              color: "#000000",
              fontSize: "16px",
              margin: "5px 0",
            }}
          >
            📍 Endereço: {cliente.endereco || "Não informado"}
          </p>
        </div>
      ))}
    </div>
  );
}