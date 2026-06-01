
import Produtos from "./pages/Produtos";
import { useState } from "react";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Boxes
} from "lucide-react";

function App() {
  const [pagina, setPagina] = useState("dashboard");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
        background:
          "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* MENU */}
      <aside
        style={{
          width: "260px",
          background: "#015c3a",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "25px 15px",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
                margin: 0,
                lineHeight: "45px",
              }}
            >
              SOARES
            </h1>

            <h2
              style={{
                color: "#7dffb3",
                marginTop: "5px",
              }}
            >
              PDV FARMÁCIA
            </h2>
          </div>

          <MenuItem icon={<Home size={20} />} text="Dashboard" active />
          <MenuItem icon={<Package size={20} />} text="Produtos" />
          <MenuItem icon={<Users size={20} />} text="Clientes" />
          <MenuItem icon={<ShoppingCart size={20} />} text="Vendas" />
          <MenuItem icon={<Boxes size={20} />} text="Estoque" />
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3 style={{ margin: 0 }}>Usuário</h3>
          <p style={{ color: "#b8ffd8" }}>Administrador</p>

          <button
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "#00a86b",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {/* TOPO */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h3
              style={{
                color: "#0c8a55",
                marginBottom: "5px",
              }}
            >
              Bem-vindo!
            </h3>

            {/* AQUI TROQUEI */}
            <h1
              style={{
                fontSize: "55px",
                margin: 0,
                color: "#063d27",
              }}
            >
              Soares PDV
            </h1>

            <p
              style={{
                color: "#666",
              }}
            >
              Resumo geral da sua farmácia
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "15px 25px",
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              fontWeight: "bold",
            }}
          >
            27/05/2025
            <br />
            16:50
          </div>
        </div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <Card titulo="Produtos" numero="2" cor="#09a55c" />

          <Card titulo="Clientes" numero="2" cor="#2d7cff" />

          <Card
            titulo="Vendas Hoje"
            numero="R$ 2.450,00"
            cor="#ffb300"
          />
        </div>

        {/* PRODUTOS */}
       <Produtos />
            
      </main>
    </div>
  );
}

function MenuItem({ icon, text, active }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "18px",
        marginBottom: "15px",
        borderRadius: "15px",
        background: active ? "#09a55c" : "rgba(255,255,255,0.05)",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {icon}
      {text}
    </div>
  );
}

function Card({ titulo, numero, cor }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: cor,
        }}
      ></div>

      <div>
        <h2>{titulo}</h2>
        <h1>{numero}</h1>
      </div>
    </div>
  );
}

const input = {
  flex: 1,
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const botaoAdicionar = {
  background: "#09a55c",
  color: "white",
  border: "none",
  borderRadius: "12px",
  padding: "15px 20px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};

const th = {
  textAlign: "left",
  padding: "20px",
  color: "#055c39",
};

const td = {
  padding: "20px",
  borderBottom: "1px solid #eee",
};

const editar = {
  background: "#09a55c",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  marginRight: "10px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};

const excluir = {
  background: "#ff2f2f",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};

export default App;