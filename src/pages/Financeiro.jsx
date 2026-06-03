import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Financeiro() {
  const [contas, setContas] = useState([]);
  const [valorRecebido, setValorRecebido] = useState({});

  useEffect(() => {
    carregarContas();
  }, []);

  async function carregarContas() {
    const { data } = await supabase
      .from("vendas_prazo")
      .select("*")
      .eq("status", "Aberto")
      .order("vencimento");

    setContas(data || []);
  }

  async function receber(conta) {
    const recebido = Number(
      valorRecebido[conta.id] || 0
    );

    const valorConta = Number(conta.valor_total);

    if (recebido < valorConta) {
      alert("Valor recebido menor que a conta.");
      return;
    }

    const troco = recebido - valorConta;

    const { error } = await supabase
      .from("recebimentos")
      .insert([
        {
          venda_prazo_id: conta.id,
          valor_conta: valorConta,
          valor_recebido: recebido,
          troco: troco,
          data_pagamento: new Date(),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    await supabase
      .from("vendas_prazo")
      .update({
        status: "Pago",
      })
      .eq("id", conta.id);

    imprimirRecibo(conta, recebido, troco);

    carregarContas();
  }

  function imprimirRecibo(conta, recebido, troco) {
    const janela = window.open("", "_blank");

    janela.document.write(`
      <html>
      <head>
        <title>Recibo</title>

        <style>
          body{
            width:80mm;
            margin:auto;
            font-family:monospace;
            font-size:12px;
            padding:10px;
          }

          .center{
            text-align:center;
          }

          hr{
            border:none;
            border-top:1px dashed #000;
            margin:8px 0;
          }
        </style>
      </head>

      <body>

        <div class="center">
          <b>SOARES PDV FARMÁCIA</b><br>
          RECEBIMENTO - CONTA PARTICULAR<br>
          (Sem valor fiscal)
        </div>

        <hr>

        Data: ${new Date().toLocaleString()}

        <br><br>

        Cliente: Consumidor Final

        <hr>

        Valor Conta:
        R$ ${Number(conta.valor_total).toFixed(2)}

        <br>

        Valor Recebido:
        R$ ${recebido.toFixed(2)}

        <br>

        Troco:
        R$ ${troco.toFixed(2)}

        <hr>

        Operador: Administrador

        <br><br><br>

        __________________________

        <br>

        Assinatura Cliente

      </body>
      </html>
    `);

    janela.document.close();
    janela.focus();
    janela.print();
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ color: "#16a34a" }}>
        💵 Contas a Receber
      </h1>

      {contas.map((conta) => {
        const valorConta = Number(conta.valor_total);

        const recebido = Number(
          valorRecebido[conta.id] || 0
        );

        const troco =
          recebido > valorConta
            ? recebido - valorConta
            : 0;

        return (
          <div
            key={conta.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <p>
              <strong>Conta:</strong>
              {" "}R$ {valorConta.toFixed(2)}
            </p>

            <p>
              <strong>Vencimento:</strong>
              {" "}{conta.vencimento}
            </p>

            <input
              type="number"
              step="0.01"
              placeholder="Valor recebido"
              value={
                valorRecebido[conta.id] || ""
              }
              onChange={(e) =>
                setValorRecebido({
                  ...valorRecebido,
                  [conta.id]: e.target.value,
                })
              }
            />

            <p>
              <strong>Troco:</strong>
              {" "}R$ {troco.toFixed(2)}
            </p>

            <button
              onClick={() => receber(conta)}
            >
              Receber e Imprimir
            </button>
          </div>
        );
      })}
    </div>
  );
}