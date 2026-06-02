import Produtos from "./pages/Produtos";
import Vendas from "./pages/Vendas";
import Clientes from "./pages/Clientes";
import Estoque from "./pages/Estoque";
import Dashboard from "./pages/Dashboard";

import { useState } from "react";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Boxes,
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
      <aside
        style={{
          width: "260px",
          background: "#1e3a8a",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "25px 15px",
        }}
      >
        <div>
          <div style={{ marginBottom: "40px" }}>
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
                color: "#93c5fd",
                marginTop: "5px",
              }}
            >
              PDV FARMÁCIA
            </h2>
          </div>

          <MenuItem
            icon={<Home size={20} />}
            text="Painel"
            active={pagina === "dashboard"}
            onClick={() => setPagina("dashboard")}
          />

          <MenuItem
            icon={<Package size={20} />}
            text="Produtos"
            active={pagina === "produtos"}
            onClick={() => setPagina("produtos")}
          />

          <MenuItem
            icon={<Users size={20} />}
            text="Clientes"
            active={pagina === "clientes"}
            onClick={() => setPagina("clientes")}
          />

          <MenuItem
            icon={<ShoppingCart size={20} />}
            text="Vendas"
            active={pagina === "vendas"}
            onClick={() => setPagina("vendas")}
          />

          <MenuItem
            icon={<Boxes size={20} />}
            text="Estoque"
            active={pagina === "estoque"}
            onClick={() => setPagina("estoque")}
          />
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.10)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3 style={{ margin: 0 }}>Usuário</h3>

          <p
            style={{
              color: "#dbeafe",
              marginTop: "5px",
            }}
          >
            Administrador
          </p>

          <button
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {pagina === "dashboard" && <Dashboard />}

        {pagina === "produtos" && <Produtos />}

        {pagina === "clientes" && <Clientes />}

        {pagina === "vendas" && <Vendas />}

        {pagina === "estoque" && <Estoque />}
      </main>
    </div>
  );
}

function MenuItem({
  icon,
  text,
  active,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "18px",
        marginBottom: "15px",
        borderRadius: "15px",
        background: active
          ? "#2563eb"
          : "rgba(255,255,255,0.08)",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {icon}
      {text}
    </div>
  );
}

export default App;