import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import BootSplash from "./pages/BootSplash";
import ThemeSelect from "./pages/ThemeSelect";

type ForgeModeId = "free";

type ForgeMode = {
  id: ForgeModeId;
  label: string; // display label for UI pill
  uiSurfaces: Array<"home" | "packages" | "logs" | "settings">;
};

const ACTIVE_MODE: ForgeMode = {
  id: "free",
  label: "FREE",
  uiSurfaces: ["home", "packages", "logs", "settings"],
};

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === "/packages" && location.pathname.startsWith("/packages"));
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        padding: "0.5rem 0.75rem",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: isActive ? "#f2f2f2" : "#fff",
        color: "#111",
        fontWeight: 600,
      }}
    >
      {children}
    </Link>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "1.25rem" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Forge</div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.06em",
              padding: "0.25rem 0.5rem",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fff",
              color: "#333", // Ensure text color is readable in dark mode
            }}
            title="Active Mode"
          >
            {ACTIVE_MODE.label}
          </span>
        </div>

        <nav style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {ACTIVE_MODE.uiSurfaces.includes("home") && <NavLink to="/home">Home</NavLink>}
          {ACTIVE_MODE.uiSurfaces.includes("packages") && <NavLink to="/packages">Packages</NavLink>}
          {ACTIVE_MODE.uiSurfaces.includes("logs") && <NavLink to="/logs">Logs</NavLink>}
          {ACTIVE_MODE.uiSurfaces.includes("settings") && <NavLink to="/settings">Settings</NavLink>}
        </nav>
      </header>

      <main style={{ marginTop: "1rem" }}>{children}</main>

      <footer style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid #eee", fontSize: 12, color: "#666" }}>
        Forge is a distro shell. Capabilities are mode-gated and bridge-scoped.
      </footer>
    </div>
  );
}

function MainApp() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:packageId" element={<PackageDetails />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('forge.theme');
    if (savedTheme) {
      document.body.classList.add(`theme-${savedTheme}`);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BootSplash />} />
        <Route path="/theme" element={<ThemeSelect />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;