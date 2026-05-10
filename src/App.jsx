import { useState } from "react";
import "./style.css";

export default function App() {
  const [pagina, setPagina] = useState("Dashboard");

  const menu = [
    "Dashboard",
    "Klanten",
    "Werkbonnen",
    "Urenregistratie",
    "Offertes",
    "Facturen",
    "Planning",
    "Instellingen"
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="logo">MRK</h1>

        {menu.map((item) => (
          <button
            key={item}
            onClick={() => setPagina(item)}
            className={pagina === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </aside>

      <main className="main">
        <header className="topbar">
          <nav>
            <span>CRM & Klanten</span>
            <span>Rapportage</span>
            <span>Werkbonnen</span>
            <span className="pill">{pagina}</span>
          </nav>
          <div className="profile">🔔 👤</div>
        </header>

        {pagina === "Dashboard" && <Dashboard />}
        {pagina === "Klanten" && <Klanten />}
        {pagina === "Werkbonnen" && <Werkbonnen />}
        {pagina === "Urenregistratie" && <Urenregistratie />}
        {pagina === "Offertes" && <Offertes />}
        {pagina === "Facturen" && <Facturen />}
        {pagina === "Planning" && <Planning />}
        {pagina === "Instellingen" && <Instellingen />}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <section className="stats">
        <div className="stat-card">
          <h3>Verzonden facturen</h3>
          <strong>448</strong>
          <p>Afgelopen maand 20% gestegen</p>
        </div>

        <div className="stat-card">
          <h3>Gefactureerd</h3>
          <strong>€58.432</strong>
          <p>75% van verzonden facturen</p>
        </div>

        <div className="stat-card">
          <h3>Openstaand</h3>
          <strong>€12.850</strong>
          <p>Nog te ontvangen bedrag</p>
        </div>
      </section>

      <section className="content">
        <div className="chart-card">
          <h2>Facturatie per maand</h2>

          <div className="chart">
            {["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"].map((m, i) => (
              <div className="bar-wrap" key={m}>
                <div className="bar-bg">
                  <div className="bar" style={{ height: `${35 + (i * 13) % 55}%` }}></div>
                </div>
                <small>{m}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="invoice-card">
          <h2>Laatste facturen</h2>
          <FactuurRegel nr="MRK-2025-001" klant="D. Bussers" status="Verstuurd" />
          <FactuurRegel nr="MRK-2025-002" klant="VvE Amsterdam" status="Openstaand" error />
          <FactuurRegel nr="MRK-2025-003" klant="Particulier klant" status="Betaald" />
        </div>
      </section>
    </>
  );
}

function Klanten() {
  const [klanten, setKlanten] = useState([]);
  const [naam, setNaam] = useState("");

  function toevoegen() {
    if (!naam) return;
    setKlanten([...klanten, naam]);
    setNaam("");
  }

  return (
    <div className="page-card">
      <h2>Klantenbeheer</h2>
      <input value={naam} onChange={(e) => setNaam(e.target.value)} placeholder="Klantnaam" />
      <button onClick={toevoegen}>Klant toevoegen</button>

      <ul>
        {klanten.map((k, i) => (
          <li key={i}>{k}</li>
        ))}
      </ul>
    </div>
  );
}

function Werkbonnen() {
  return (
    <div className="page-card">
      <h2>Werkbonnen</h2>
      <input placeholder="Klantnaam" />
      <input placeholder="Projectadres" />
      <textarea placeholder="Uitgevoerde werkzaamheden"></textarea>
      <button>Werkbon opslaan</button>
    </div>
  );
}

function Urenregistratie() {
  return (
    <div className="page-card">
      <h2>Urenregistratie</h2>
      <input placeholder="Medewerker" />
      <input placeholder="Project" />
      <input type="number" placeholder="Aantal uren" />
      <input type="number" placeholder="Uurtarief" defaultValue="55" />
      <button>Uren opslaan</button>
    </div>
  );
}

function Offertes() {
  return (
    <div className="page-card">
      <h2>Offertes</h2>
      <input placeholder="Klantnaam" />
      <input placeholder="Offertenummer" />
      <textarea placeholder="Omschrijving offerte"></textarea>
      <input type="number" placeholder="Bedrag excl. btw" />
      <button>Offerte maken</button>
    </div>
  );
}

function Facturen() {
  return (
    <div className="page-card">
      <h2>Facturen</h2>
      <FactuurRegel nr="MRK-2025-001" klant="D. Bussers" status="Verstuurd" />
      <FactuurRegel nr="MRK-2025-002" klant="VvE Amsterdam" status="Openstaand" error />
      <FactuurRegel nr="MRK-2025-003" klant="Particulier klant" status="Betaald" />
      <button onClick={() => window.print()}>Facturen printen</button>
    </div>
  );
}

function Planning() {
  return (
    <div className="page-card">
      <h2>Planning</h2>
      <input type="date" />
      <input placeholder="Klant / project" />
      <input placeholder="Medewerker" />
      <button>Afspraak toevoegen</button>
    </div>
  );
}

function Instellingen() {
  return (
    <div className="page-card">
      <h2>Instellingen</h2>
      <input placeholder="Bedrijfsnaam" defaultValue="MRK Aannemersbedrijf" />
      <input placeholder="E-mail" />
      <input placeholder="Telefoonnummer" />
      <input placeholder="IBAN" />
      <button>Opslaan</button>
    </div>
  );
}

function FactuurRegel({ nr, klant, status, error }) {
  return (
    <div className="invoice">
      <div className={error ? "icon error" : "icon"}>{error ? "!" : "✓"}</div>
      <div>
        <strong>Factuur {nr}</strong>
        <p>{status} naar {klant}</p>
        <small>Vandaag</small>
      </div>
      <button>Bekijk</button>
    </div>
  );
}
