import "./style.css";

export default function App() {
  const facturen = [
    { nr: "MRK-2025-001", klant: "D. Bussers", status: "Verstuurd", bedrag: 1250, tijd: "08:05" },
    { nr: "MRK-2025-002", klant: "VvE Amsterdam", status: "Niet verstuurd", bedrag: 890, tijd: "09:20" },
    { nr: "MRK-2025-003", klant: "Particulier klant", status: "Betaald", bedrag: 2100, tijd: "14:05" },
    { nr: "MRK-2025-004", klant: "Onderhoud Project", status: "Openstaand", bedrag: 675, tijd: "16:30" }
  ];

  const totaal = facturen.reduce((s, f) => s + f.bedrag, 0);
  const openstaand = facturen
    .filter(f => f.status === "Openstaand" || f.status === "Niet verstuurd")
    .reduce((s, f) => s + f.bedrag, 0);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="logo">MRK</h1>

        <button className="active">Dashboard</button>
        <button>Klanten</button>
        <button>Werkbonnen</button>
        <button>Urenregistratie</button>
        <button>Offertes</button>
        <button>Facturen</button>
        <button>Planning</button>

        <div className="bottom">
          <button>Instellingen</button>
          <button>Uitloggen</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <nav>
            <span>CRM & Klanten</span>
            <span>Rapportage</span>
            <span>Werkbonnen</span>
            <span className="pill">Facturatie</span>
          </nav>

          <div className="profile">🔔 👤</div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <h3>Verzonden facturen</h3>
            <strong>448</strong>
            <p>Afgelopen maand 20% gestegen</p>
          </div>

          <div className="stat-card">
            <h3>Gefactureerd</h3>
            <strong>€ {totaal.toFixed(2)}</strong>
            <p>75% van verzonden facturen</p>
          </div>

          <div className="stat-card">
            <h3>Openstaand</h3>
            <strong>€ {openstaand.toFixed(2)}</strong>
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
            <h2>Verzonden facturen</h2>

            {facturen.map((f) => (
              <div className="invoice" key={f.nr}>
                <div className={f.status === "Niet verstuurd" ? "icon error" : "icon"}>✓</div>

                <div>
                  <strong>Factuur {f.nr}</strong>
                  <p>
                    {f.status} naar {f.klant}
                  </p>
                  <small>{f.tijd}</small>
                </div>

                <button>Bekijk</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
