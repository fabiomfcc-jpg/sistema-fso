import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [busca, setBusca] = useState("");
  const [carrinho, setCarrinho] = useState([]);
const [tipoVenda, setTipoVenda] = useState("avista");
const [vencimento, setVencimento] = useState("");
  useEffect(() => {
    carregarProdutos();
    carregarClientes();
  }, []);

  async function carregarProdutos() {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("nome");

    setProdutos(data || []);
  }

  async function carregarClientes() {
    const { data } = await supabase
      .from("clientes")
      .select("*")
      .order("nome");

    setClientes(data || []);
  }

  function adicionarProduto(produto) {
    const existe = carrinho.find(
      (item) => item.id === produto.id
    );

    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...produto,
          quantidade: 1,
        },
      ]);
    }
  }

  function calcularTotal() {
    return carrinho.reduce(
      (total, item) =>
        total +
        Number(item.venda) *
          Number(item.quantidade),
      0
    );
  }

  async function finalizarVenda() {
    if (carrinho.length === 0) {
      alert("Carrinho vazio");
      return;
    }

    const totalVenda = calcularTotal();
    if (
  tipoVenda === "prazo" &&
  !vencimento
) {
  alert("Informe a data de vencimento");
  return;
}

    const { data: venda, error } = await supabase
      .from("vendas")
      .insert([
        {
          data_venda: new Date(),
          cliente:
            clienteSelecionado ||
            "Consumidor Final",
          total: totalVenda,
        },
      ])
      .select()
      .single();

    if (error) {
      alert("Erro ao salvar venda");
      console.log(error);
      return;
    }

    for (const item of carrinho) {
      await supabase
        .from("itens_venda")
        .insert([
          {
            venda_id: venda.id,
            produto_id: item.id,
            produto_nome: item.nome,
            quantidade: item.quantidade,
            valor_unitario: item.venda,
            subtotal:
              Number(item.venda) *
              Number(item.quantidade),
          },
        ]);

      await supabase
        .from("produtos")
        .update({
          estoque:
            Number(item.estoque) -
            Number(item.quantidade),
        })
        .eq("id", item.id);
    }
if (tipoVenda === "prazo") {
  const clienteObj = clientes.find(
    (c) => c.nome === clienteSelecionado
  );

  const { error: erroPrazo } = await supabase
    .from("vendas_prazo")
    .insert([
      {
        cliente_id: clienteObj?.id || null,
        vencimento: vencimento,
        valor_total: totalVenda,
        status: "Aberto",
      },
    ]);

  if (erroPrazo) {
    console.log("ERRO PRAZO:", erroPrazo);
    alert(erroPrazo.message);
  }
}

 
    alert("Venda realizada com sucesso!");

    setCarrinho([]);
    setClienteSelecionado("");

    carregarProdutos();
  }

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "30px",
        background: "#fff",
        borderRadius: "20px",
      }}
    >
      <h1
        style={{
          color: "#0c8a55",
          marginBottom: "20px",
        }}
      >
        💰 PDV - Vendas
      </h1>

      <select
        value={clienteSelecionado}
        onChange={(e) =>
          setClienteSelecionado(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <option value="">
          Consumidor Final
        </option>

        {clientes.map((cliente) => (
          <option
            key={cliente.id}
            value={cliente.nome}
          >
            {cliente.nome}
          </option>
        ))}
     </select>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <select
    value={tipoVenda}
    onChange={(e) => setTipoVenda(e.target.value)}
    style={{
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    <option value="avista">
      À Vista
    </option>

    <option value="prazo">
      A Prazo
    </option>
  </select>

  {tipoVenda === "prazo" && (
    <input
      type="date"
      value={vencimento}
      onChange={(e) =>
        setVencimento(e.target.value)
      }
      style={{
        padding: "12px",
        borderRadius: "8px",
      }}
    />
  )}
</div>

<input
  type="text"
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <h2 style={{ color: "#000" }}>
        Produtos
      </h2>

      {produtosFiltrados.map((produto) => (
        <div
          key={produto.id}
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            padding: "15px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            color: "#000",
          }}
        >
          <div>
            <strong>
              {produto.nome}
            </strong>

            <br />

            Estoque:
            {" "}
            {produto.estoque}

            <br />

            Venda: R$
            {" "}
            {Number(
              produto.venda
            ).toFixed(2)}
          </div>

          <button
            onClick={() =>
              adicionarProduto(produto)
            }
            style={{
              background: "#0c8a55",
              color: "#fff",
              border: "none",
              padding:
                "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Adicionar
          </button>
        </div>
      ))}

      <hr />

      <h2 style={{ color: "#000" }}>
        Carrinho
      </h2>

      {carrinho.map((item) => (
        <div
          key={item.id}
          style={{
            color: "#000",
            marginBottom: "10px",
          }}
        >
          {item.nome}
          {" - "}
          {item.quantidade}x
          {" - R$ "}
          {Number(
            item.venda
          ).toFixed(2)}
        </div>
      ))}

      <h2
        style={{
          color: "#0c8a55",
        }}
      >
        Total: R$
        {" "}
        {calcularTotal().toFixed(2)}
      </h2>

      <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <button
    onClick={finalizarVenda}
    style={{
      background: "#0c8a55",
      color: "#fff",
      border: "none",
      padding: "15px 25px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    Finalizar Venda
  </button>

  <button
    onClick={() => window.print()}
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "15px 25px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    Imprimir Venda
  </button>
</div>
    </div>
  );
}