export function imprimirRecebimento(dados) {
  const janela = window.open("", "", "width=400,height=800");

  janela.document.write(`
    <html>
    <head>
      <title>Recibo</title>

      <style>
        body{
          font-family: monospace;
          width:80mm;
          margin:auto;
          padding:10px;
          font-size:14px;
        }

        .center{
          text-align:center;
        }

        hr{
          border:none;
          border-top:1px dashed #000;
          margin:8px 0;
        }

        table{
          width:100%;
          font-size:12px;
        }

        td{
          padding:2px;
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

      Cliente: ${dados.cliente}<br>
      Data: ${new Date().toLocaleString()}<br>

      <hr>

      Valor Conta: R$ ${dados.valorConta}<br>
      Valor Recebido: R$ ${dados.valorRecebido}<br>
      Troco: R$ ${dados.troco}<br>

      <hr>

      Operador: Administrador

      <br><br><br>

      _________________________
      <br>
      Assinatura Cliente

      <br><br>

      <div class="center">
        Obrigado pela preferência
      </div>

    </body>
    </html>
  `);

  janela.document.close();
  janela.focus();
  janela.print();
}