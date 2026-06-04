import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [busca, setBusca] = useState("");
  const [carrinho, setCarrinho] = useState([]);
const [tipoVenda, setTipoVenda] = useState("avista");

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

  const dataVencimento = new Date();

  dataVencimento.setDate(
    dataVencimento.getDate() + 30
  );

  const { error: erroPrazo } = await supabase
    .from("vendas_prazo")
    .insert([
      {
        cliente_id: clienteObj?.id || null,
        vencimento: dataVencimento
          .toISOString()
          .split("T")[0],
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

  function imprimirVendaPrazo() {
  const cliente = clientes.find(
    (c) => c.nome === clienteSelecionado
  );

  const produtosHTML = carrinho
    .map(
      (item) => `
      <tr>
        <td>${item.quantidade}</td>
        <td>${item.nome}</td>
        <td>R$ ${Number(item.venda).toFixed(2)}</td>
        <td>R$ ${(item.quantidade * item.venda).toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  const janela = window.open("", "_blank");

  janela.document.write(`
  <html>
  <body style="width:80mm;font-family:monospace;padding:10px">

  <center>
    <b>SOARES PDV FARMÁCIA</b><br>
    EXTRATO - CONTA PARTICULAR<br>
    (Sem valor fiscal)
  </center>

  <hr>

  Cliente:
  ${cliente?.nome || "Consumidor Final"}

  <br><br>

  Data:
  ${new Date().toLocaleDateString()}

  <hr>

  <table width="100%">
    ${produtosHTML}
  </table>

  <hr>

  <b>
    Total: R$ ${calcularTotal().toFixed(2)}
  </b>

  <br><br><br>

  _______________________

  <br>

  Assinatura Cliente

  </body>
  </html>
  `);

  janela.document.close();
  janela.print();
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
  onClick={imprimirVendaPrazo}
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