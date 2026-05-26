import { useState } from "react"

function App() {

  // CONTROLE DE TELAS
  const [pagina, setPagina] = useState("home")

  // CLIENTES
  const [nomeCliente, setNomeCliente] = useState("")
  const [cpf, setCpf] = useState("")
  const [rg, setRg] = useState("")
  const [telefone, setTelefone] = useState("")
  const [endereco, setEndereco] = useState("")
  const [clientes, setClientes] = useState([])

  // PRODUTOS
  const [produto, setProduto] = useState("")
  const [codigoBarras, setCodigoBarras] = useState("")
  const [categoria, setCategoria] = useState("")
  const [estoque, setEstoque] = useState("")
  const [valorCompra, setValorCompra] = useState("")
  const [valorVenda, setValorVenda] = useState("")
  const [foto, setFoto] = useState("")

  const [produtos, setProdutos] = useState([])

  // VENDAS
  const totalEstoque = produtos.reduce((acc, item) => {
    return acc + Number(item.valorVenda)
  }, 0)

  // CADASTRAR CLIENTE
  function cadastrarCliente() {

    if (!nomeCliente || !cpf) {
      alert("Preencha Nome e CPF")
      return
    }

    const novoCliente = {
      nomeCliente,
      cpf,
      rg,
      telefone,
      endereco
    }

    setClientes([...clientes, novoCliente])

    setNomeCliente("")
    setCpf("")
    setRg("")
    setTelefone("")
    setEndereco("")
  }

  // CADASTRAR PRODUTO
  function cadastrarProduto() {

    if (!produto || !valorVenda) {
      alert("Preencha Produto e Valor")
      return
    }

    const novoProduto = {
      produto,
      codigoBarras,
      categoria,
      estoque,
      valorCompra,
      valorVenda,
      foto
    }

    setProdutos([...produtos, novoProduto])

    setProduto("")
    setCodigoBarras("")
    setCategoria("")
    setEstoque("")
    setValorCompra("")
    setValorVenda("")
    setFoto("")
  }

  // REMOVER CLIENTE
  function removerCliente(index) {

    const novaLista = clientes.filter((item, i) => i !== index)

    setClientes(novaLista)
  }

  // REMOVER PRODUTO
  function removerProduto(index) {

    const novaLista = produtos.filter((item, i) => i !== index)

    setProdutos(novaLista)
  }

  return (

    <div style={{
      minHeight: "100vh",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2070')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "Arial",
      color: "white"
    }}>

      {/* CAMADA ESCURA */}

      <div style={{
        backgroundColor: "rgba(0,0,0,0.85)",
        minHeight: "100vh"
      }}>

        {/* MENU */}

        <div style={{
          backgroundColor: "#111",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>

          <button onClick={() => setPagina("home")}>
            Home
          </button>

          <button onClick={() => setPagina("clientes")}>
            Clientes
          </button>

          <button onClick={() => setPagina("produtos")}>
            Produtos
          </button>

        </div>

        {/* TÍTULO */}

        <h1 style={{
          textAlign: "center",
          fontSize: "55px",
          paddingTop: "20px"
        }}>
          Sistema F.S.O
        </h1>

        {/* HOME */}

        {pagina === "home" && (

          <div style={{
            padding: "40px"
          }}>

            <h2>Painel Administrativo</h2>

            <div style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "30px"
            }}>

              <div style={{
                backgroundColor: "#2c2c2c",
                padding: "30px",
                borderRadius: "10px",
                width: "250px"
              }}>

                <h2>Clientes</h2>

                <h1>{clientes.length}</h1>

              </div>

              <div style={{
                backgroundColor: "#2c2c2c",
                padding: "30px",
                borderRadius: "10px",
                width: "250px"
              }}>

                <h2>Produtos</h2>

                <h1>{produtos.length}</h1>

              </div>

              <div style={{
                backgroundColor: "#2c2c2c",
                padding: "30px",
                borderRadius: "10px",
                width: "250px"
              }}>

                <h2>Total Estoque</h2>

                <h1>
                  R$ {totalEstoque.toFixed(2)}
                </h1>

              </div>

            </div>

          </div>

        )}

        {/* CLIENTES */}

        {pagina === "clientes" && (

          <div style={{
            padding: "40px"
          }}>

            <h2>Cadastro de Clientes</h2>

            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}>

              <input
                type="text"
                placeholder="Nome"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="text"
                placeholder="RG"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                style={{
                  padding: "10px",
                  width: "300px"
                }}
              />

            </div>

            <br />

            <button
              onClick={cadastrarCliente}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "5px"
              }}
            >
              Cadastrar Cliente
            </button>

            <hr />

            {clientes.map((item, index) => (

              <div
                key={index}
                style={{
                  backgroundColor: "#2c2c2c",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "10px"
                }}
              >

                <p><strong>Nome:</strong> {item.nomeCliente}</p>
                <p><strong>CPF:</strong> {item.cpf}</p>
                <p><strong>RG:</strong> {item.rg}</p>
                <p><strong>Telefone:</strong> {item.telefone}</p>
                <p><strong>Endereço:</strong> {item.endereco}</p>

                <button
                  onClick={() => removerCliente(index)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px"
                  }}
                >
                  Remover
                </button>

              </div>

            ))}

          </div>

        )}

        {/* PRODUTOS */}

        {pagina === "produtos" && (

          <div style={{
            padding: "40px"
          }}>

            <h2>Cadastro de Produtos</h2>

            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}>

              <input
                type="text"
                placeholder="Nome Produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="text"
                placeholder="Código de Barras"
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="number"
                placeholder="Estoque"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="number"
                placeholder="Valor Unitário"
                value={valorCompra}
                onChange={(e) => setValorCompra(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="number"
                placeholder="Valor Venda"
                value={valorVenda}
                onChange={(e) => setValorVenda(e.target.value)}
                style={{
                  padding: "10px"
                }}
              />

              <input
                type="text"
                placeholder="URL da Foto"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                style={{
                  padding: "10px",
                  width: "250px"
                }}
              />

            </div>

            <br />

            <button
              onClick={cadastrarProduto}
              style={{
                backgroundColor: "#0066ff",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "5px"
              }}
            >
              Cadastrar Produto
            </button>

            <hr />

            <div style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap"
            }}>

              {produtos.map((item, index) => (

                <div
                  key={index}
                  style={{
                    backgroundColor: "#2c2c2c",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "300px"
                  }}
                >

                  <img
                    src={item.foto}
                    alt=""
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />

                  <h2>{item.produto}</h2>

                  <p>
                    <strong>Código:</strong> {item.codigoBarras}
                  </p>

                  <p>
                    <strong>Categoria:</strong> {item.categoria}
                  </p>

                  <p>
                    <strong>Estoque:</strong> {item.estoque}
                  </p>

                  <p>
                    <strong>Valor Unitário:</strong>
                    R$ {Number(item.valorCompra).toFixed(2)}
                  </p>

                  <p>
                    <strong>Valor Venda:</strong>
                    R$ {Number(item.valorVenda).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removerProduto(index)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px"
                    }}
                  >
                    Remover
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  )
}

export default App