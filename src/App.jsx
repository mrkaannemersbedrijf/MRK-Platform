import { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const [ingelogd, setIngelogd] = useState(
    localStorage.getItem("mrk_login") === "true"
  );

  const [email, setEmail] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [pagina, setPagina] = useState("Dashboard");

  const [facturen, setFacturen] = useState(() => {
    return JSON.parse(localStorage.getItem("mrk_facturen")) || [];
  });

  useEffect(() => {
    localStorage.setItem("mrk_facturen", JSON.stringify(facturen));
  }, [facturen]);

  function login() {
    if (email === "admin@mrk.nl" && wachtwoord === "mrk123") {
      localStorage.setItem("mrk_login", "true");
      setIngelogd(true);
    } else {
      alert("Onjuiste inloggegevens");
    }
  }

  function logout() {
    localStorage.removeItem("mrk_login");
    setIngelogd(false);
  }

  if (!ingelogd) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <h1>MRK Portaal</h1>
          <p>Log in om het administratieportaal te openen.</p>

          <input
            placeholder="E-mailadres"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Wachtwoord"
            value={wachtwoord}
            onChange={(e) => setWachtwoord(e.target.value)}
          />

          <button onClick={login}>Inloggen</button>

          <small>
            Login: admin@mrk.nl <br />
            Wachtwoord: mrk123
          </small>
        </div>
      </div>
    );
  }

  const totaal = facturen.reduce((s, f) => s + Number(f.bedrag || 0), 0);

  const openstaand = facturen
    .filter((f) => f.status === "Openstaand")
    .reduce((s, f) => s + Number(f.bedrag || 0), 0);

  const verzonden = facturen.filter((f) => f.status === "Verstuurd").length;
  const betaald = facturen.filter((f) => f.status === "Betaald").length;

  const menu = [
    "Dashboard",
    "Klanten",
    "Werkbonnen",
    "Urenregistratie",
    "Offertes",
    "Facturen",
    "Planning",
    "Instellingen",
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

        <div className="bottom">
          <button onClick={logout}>Uitloggen</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <nav>
            <span>CRM & Klanten</span>
            <span>Rapportage & analytics</span>
            <span>Werkbonnen</span>
            <span className="pill">{pagina}</span>
          </nav>

          <div className="profile">🔔 👤</div>
        </header>

        {pagina === "Dashboard" && (
          <>
            <section className="stats">
              <div className="stat-card">
                <h3>Verzonden facturen</h3>
                <strong>{verzonden}</strong>
                <p>Aantal verzonden facturen</p>
              </div>

              <div className="stat-card">
                <h3>Gefactureerd</h3>
                <strong>€ {totaal.toFixed(2)}</strong>
                <p>Totaal aangemaakt</p>
              </div>

              <div className="stat-card">
                <h3>Openstaand</h3>
                <strong>€ {openstaand.toFixed(2)}</strong>
                <p>Nog te ontvangen</p>
              </div>

              <div className="stat-card">
                <h3>Betaald</h3>
                <strong>{betaald}</strong>
                <p>Betaalde facturen</p>
              </div>
            </section>

            <section className="content">
              <div className="chart-card">
                <h2>Facturatie per maand</h2>

                <div className="chart">
                  {["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"].map((m, i) => (
                    <div className="bar-wrap" key={m}>
                      <div className="bar-bg">
                        <div
                          className="bar"
                          style={{ height: `${35 + ((i * 13) % 55)}%` }}
                        ></div>
                      </div>
                      <small>{m}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="invoice-card">
                <h2>Laatste facturen</h2>

                {facturen.length === 0 && <p>Nog geen facturen aangemaakt.</p>}

                {facturen.map((f) => (
                  <FactuurRegel key={f.id} factuur={f} />
                ))}
              </div>
            </section>
          </>
        )}

        {pagina === "Facturen" && (
          <Facturen facturen={facturen} setFacturen={setFacturen} />
        )}

        {pagina === "Klanten" && (
          <Page title="Klanten">
            <input placeholder="Klantnaam" />
            <input placeholder="E-mailadres" />
            <input placeholder="Telefoonnummer" />
            <button>Klant opslaan</button>
          </Page>
        )}

        {pagina === "Werkbonnen" && (
          <Page title="Werkbonnen">
            <input placeholder="Klantnaam" />
            <input placeholder="Projectadres" />
            <textarea placeholder="Uitgevoerde werkzaamheden"></textarea>
            <button>Werkbon opslaan</button>
          </Page>
        )}

        {pagina === "Urenregistratie" && (
          <Page title="Urenregistratie">
            <input placeholder="Medewerker" />
            <input placeholder="Project" />
            <input type="number" placeholder="Aantal uren" />
            <input type="number" placeholder="Uurtarief" defaultValue="55" />
            <button>Uren opslaan</button>
          </Page>
        )}

        {pagina === "Offertes" && (
          <Page title="Offertes">
            <input placeholder="Klantnaam" />
            <input placeholder="Offertenummer" />
            <textarea placeholder="Omschrijving offerte"></textarea>
            <input type="number" placeholder="Bedrag excl. btw" />
            <button>Offerte maken</button>
          </Page>
        )}

        {pagina === "Planning" && (
          <Page title="Planning">
            <input type="date" />
            <input placeholder="Klant / project" />
            <input placeholder="Medewerker" />
            <button>Afspraak toevoegen</button>
          </Page>
        )}

        {pagina === "Instellingen" && (
          <Page title="Instellingen">
            <input placeholder="Bedrijfsnaam" defaultValue="MRK Aannemersbedrijf" />
            <input placeholder="E-mail" />
            <input placeholder="Telefoonnummer" />
            <input placeholder="IBAN" />
            <button>Opslaan</button>
          </Page>
        )}
      </main>
    </div>
  );
}

function Facturen({ facturen, setFacturen }) {
  const [klant, setKlant] = useState("");
  const [email, setEmail] = useState("");
  const [omschrijving, setOmschrijving] = useState("");
  const [bedrag, setBedrag] = useState("");
  const [vervaldatum, setVervaldatum] = useState("");

  function toevoegen() {
    if (!klant || !bedrag) return;

    setFacturen([
      ...facturen,
      {
        id: Date.now(),
        nr: `MRK-2025-${String(facturen.length + 1).padStart(3, "0")}`,
        klant,
        email,
        omschrijving,
        bedrag,
        status: "Openstaand",
        vervaldatum,
        tijd: new Date().toLocaleTimeString("nl-NL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setKlant("");
    setEmail("");
    setOmschrijving("");
    setBedrag("");
    setVervaldatum("");
  }

  function statusWijzigen(id, status) {
    setFacturen(
      facturen.map((f) => (f.id === id ? { ...f, status } : f))
    );
  }

  function verstuurFactuur(f) {
    const onderwerp = encodeURIComponent(`Factuur ${f.nr} - MRK Aannemersbedrijf`);
    const tekst = encodeURIComponent(
      `Beste ${f.klant},\n\nBijgaand ontvangt u factuur ${f.nr}.\n\nOmschrijving: ${f.omschrijving}\nBedrag: € ${Number(f.bedrag).toFixed(2)}\nVervaldatum: ${f.vervaldatum}\n\nMet vriendelijke groet,\nMRK Aannemersbedrijf`
    );

    window.location.href = `mailto:${f.email}?subject=${onderwerp}&body=${tekst}`;

    statusWijzigen(f.id, "Verstuurd");
  }

  return (
    <div className="page-card">
      <h2>Factuur maken</h2>

      <input
        placeholder="Klantnaam"
        value={klant}
        onChange={(e) => setKlant(e.target.value)}
      />

      <input
        placeholder="E-mailadres klant"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Omschrijving"
        value={omschrijving}
        onChange={(e) => setOmschrijving(e.target.value)}
      />

      <input
        placeholder="Bedrag excl. btw"
        type="number"
        value={bedrag}
        onChange={(e) => setBedrag(e.target.value)}
      />

      <input
        type="date"
        value={vervaldatum}
        onChange={(e) => setVervaldatum(e.target.value)}
      />

      <button onClick={toevoegen}>Factuur toevoegen</button>

      <h2>Facturen overzicht</h2>

      {facturen.map((f) => (
        <div className="invoice" key={f.id}>
          <div className={f.status === "Openstaand" ? "icon error" : "icon"}>
            {f.status === "Openstaand" ? "!" : "✓"}
          </div>

          <div>
            <strong>{f.nr}</strong>
            <p>
              {f.klant} - € {Number(f.bedrag).toFixed(2)}
            </p>
            <p>{f.omschrijving}</p>
            <small>Vervaldatum: {f.vervaldatum || "Niet ingesteld"}</small>

            <select
              value={f.status}
              onChange={(e) => statusWijzigen(f.id, e.target.value)}
            >
              <option>Openstaand</option>
              <option>Verstuurd</option>
              <option>Betaald</option>
              <option>1e herinnering</option>
              <option>2e herinnering</option>
              <option>Aanmaning</option>
            </select>
          </div>

          <button onClick={() => verstuurFactuur(f)}>Verstuur</button>
        </div>
      ))}
    </div>
  );
}

function FactuurRegel({ factuur }) {
  return (
    <div className="invoice">
      <div className={factuur.status === "Openstaand" ? "icon error" : "icon"}>
        {factuur.status === "Openstaand" ? "!" : "✓"}
      </div>

      <div>
        <strong>Factuur {factuur.nr}</strong>
        <p>
          {factuur.status} naar {factuur.klant}
        </p>
        <small>{factuur.tijd}</small>
      </div>

      <button>Bekijk</button>
    </div>
  );
}

function Page({ title, children }) {
  return (
    <div className="page-card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
