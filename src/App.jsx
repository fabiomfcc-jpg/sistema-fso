import { useState } from "react";

function App() {
  const [pagina, setPagina] = useState("dashboard");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",

        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.70), rgba(255,255,255,0.70)), url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1974&auto=format&fit=crop')",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* MENU */}
      <div
        style={{
          width: "260px",
          background: "linear-gradient(180deg,#012e1d,#00140d)",
          padding: "25px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "5px 0 20px rgba(0,0,0,0.2)",
        }}
      >
        <div>
          {/* LOGO */}
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "50px",
                margin: "0",
                fontWeight: "bold",
              }}
            >
              PDV
            </h1>

            <h2
              style={{
                color: "#00ff4c",
                marginTop: "0",
                fontSize: "38px",
              }}
            >
              FARMÁCIA
            </h2>
          </div>

          {/* BOTÕES */}
          {["dashboard", "produtos", "clientes", "vendas", "estoque"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setPagina(item)}
                style={{
                  width: "100%",
                  padding: "18px",
                  marginBottom: "18px",
                  borderRadius: "15px",
                  border: "none",

                  background:
                    pagina === item
                      ? "#10e64a"
                      : "rgba(255,255,255,0.06)",

                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",

                  boxShadow:
                    pagina === item
                      ? "0 0 20px rgba(16,230,74,0.5)"
                      : "none",

                  transition: "0.3s",
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            )
          )}
        </div>

        {/* USUÁRIO */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            padding: "18px",
            borderRadius: "14px",
          }}
        >
          <h3 style={{ margin: "0" }}>Usuário</h3>

          <p style={{ marginTop: "5px" }}>Administrador</p>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        style={{
          flex: 1,
          padding: "60px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3
          style={{
            color: "#09993b",
            fontSize: "35px",
            marginBottom: "0",
          }}
        >
          Bem-vindo!
        </h3>

        <h1
          style={{
            fontSize: "75px",
            marginTop: "10px",
            color: "#012d1a",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "22px",
            marginBottom: "40px",
          }}
        >
          Resumo geral da sua farmácia
        </p>

        {/* CARDS */}
        <div
          style={{
            display: "flex",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          {/* PRODUTOS */}
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              width: "270px",
              padding: "35px",
              borderRadius: "25px",
              boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ color: "#10b248" }}>Produtos</h2>

            <h1 style={{ fontSize: "55px" }}>2</h1>

            <p style={{ color: "#666" }}>Total cadastrados</p>
          </div>

          {/* CLIENTES */}
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              width: "270px",
              padding: "35px",
              borderRadius: "25px",
              boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ color: "#2b6cff" }}>Clientes</h2>

            <h1 style={{ fontSize: "55px" }}>2</h1>

            <p style={{ color: "#666" }}>Total cadastrados</p>
          </div>

          {/* VENDAS */}
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              width: "320px",
              padding: "35px",
              borderRadius: "25px",
              boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ color: "#ff9800" }}>Vendas Hoje</h2>

            <h1
              style={{
                fontSize: "50px",
                color: "#222",
              }}
            >
              R$ 2.450,00
            </h1>

            <p style={{ color: "#666" }}>Total de vendas</p>
          </div>
        </div>

        {/* TABELA */}
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "25px",
            padding: "35px",
            boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              color: "#0ca043",
              marginBottom: "0",
            }}
          >
            Produtos
          </h1>

          <p
            style={{
              color: "#666",
              marginBottom: "30px",
            }}
          >
            Gerencie os produtos da sua farmácia
          </p>

          {/* INPUTS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "30px",
            }}
          >
            <input
              placeholder="Nome do produto"
              style={{
                flex: 1,
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />

            <input
              placeholder="Preço (R$)"
              style={{
                flex: 1,
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />

            <input
              placeholder="Estoque"
              style={{
                flex: 1,
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />

            <button
              style={{
                background: "#10b248",
                color: "white",
                border: "none",
                padding: "18px 30px",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              + Adicionar Produto
            </button>
          </div>

          {/* TABELA */}
          <table
            width="100%"
            style={{
              borderCollapse: "collapse",
              overflow: "hidden",
              borderRadius: "20px",
              background: "white",
            }}
          >
            <thead
              style={{
                background: "#eef6f0",
                textAlign: "left",
              }}
            >
              <tr>
                <th style={{ padding: "20px" }}>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "25px" }}>Dipirona</td>

                <td>R$ 15,99</td>

                <td>20</td>

                <td>
                  <button
                    style={{
                      background: "#10b248",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>

                  <button
                    style={{
                      background: "#ff3d3d",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>

              <tr>
                <td style={{ padding: "25px" }}>Paracetamol</td>

                <td>R$ 12,50</td>

                <td>35</td>

                <td>
                  <button
                    style={{
                      background: "#10b248",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>

                  <button
                    style={{
                      background: "#ff3d3d",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;