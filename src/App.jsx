import { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const [pagina, setPagina] = useState("Dashboard");

  const [klanten, setKlanten] = useState(() => {
    return JSON.parse(localStorage.getItem("mrk_klanten")) || [];
  });

  const [facturen, setFacturen] = useState(() => {
    return JSON.parse(localStorage.getItem("mrk_facturen")) || [];
  });

  const [werkbonnen, setWerkbonnen] = useState(() => {
    return JSON.parse(localStorage.getItem("mrk_werkbonnen")) || [];
  });

  const [uren, setUren] = useState(() => {
    return JSON.parse(localStorage.getItem("mrk_uren")) || [];
  });

  useEffect(() => {
    localStorage.setItem("mrk_klanten", JSON.stringify(klanten));
  }, [klanten]);

  useEffect(() => {
    localStorage.setItem("mrk_facturen", JSON.stringify(facturen));
  }, [facturen]);

  useEffect(() => {
    localStorage.setItem("mrk_werkbonnen", JSON.stringify(werkbonnen));
  }, [werkbonnen]);

  useEffect(() => {
    localStorage.setItem("mrk_uren", JSON.stringify(uren));
  }, [uren]);

  const menu = [
    "Dashboard",
    "Klanten",
    "Werkbonnen",
    "Urenregistratie",
    "Facturen",
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
          <h2>{pagina}</h2>
        </header>

        {pagina === "Dashboard" && (
          <Dashboard
            klanten={klanten}
            facturen={facturen}
            werkbonnen={werkbonnen}
            uren={uren}
          />
        )}

        {pagina === "Klanten" && (
          <Klanten
            klanten={klanten}
            setKlanten={setKlanten}
          />
        )}

        {pagina === "Werkbonnen" && (
          <Werkbonnen
            werkbonnen={werkbonnen}
            setWerkbonnen={setWerkbonnen}
          />
        )}

        {pagina === "Urenregistratie" && (
          <Urenregistratie
            uren={uren}
            setUren={setUren}
          />
        )}

        {pagina === "Facturen" && (
          <Facturen
            facturen={facturen}
            setFacturen={setFacturen}
          />
        )}

        {pagina === "Instellingen" && <Instellingen />}
      </main>
    </div>
  );
}

function Dashboard({ klanten, facturen, werkbonnen, uren }) {
  const openstaand = facturen.reduce(
    (s, f) => s + Number(f.bedrag || 0),
    0
  );

  return (
    <>
      <section className="stats">
        <div className="stat-card">
          <h3>Klanten</h3>
          <strong>{klanten.length}</strong>
        </div>

        <div className="stat-card">
          <h3>Werkbonnen</h3>
          <strong>{werkbonnen.length}</strong>
        </div>

        <div className="stat-card">
          <h3>Openstaand</h3>
          <strong>€ {openstaand.toFixed(2)}</strong>
        </div>

        <div className="stat-card">
          <h3>Urenregistraties</h3>
          <strong>{uren.length}</strong>
        </div>
      </section>
    </>
  );
}

function Klanten({ klanten, setKlanten }) {
  const [naam, setNaam] = useState("");

  function toevoegen() {
    if (!naam) return;

    setKlanten([
      ...klanten,
      {
        id: Date.now(),
        naam
      }
    ]);

    setNaam("");
  }

  return (
    <div className="page-card">
      <h2>Klanten</h2>

      <input
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        placeholder="Klantnaam"
      />

      <button onClick={toevoegen}>
        Klant toevoegen
      </button>

      {klanten.map((k) => (
        <div className="list-item" key={k.id}>
          {k.naam}
        </div>
      ))}
    </div>
  );
}

function Werkbonnen({ werkbonnen, setWerkbonnen }) {
  const [klant, setKlant] = useState("");
  const [werk, setWerk] = useState("");

  function toevoegen() {
    if (!klant || !werk) return;

    setWerkbonnen([
      ...werkbonnen,
      {
        id: Date.now(),
        klant,
        werk
      }
    ]);

    setKlant("");
    setWerk("");
  }

  return (
    <div className="page-card">
      <h2>Werkbonnen</h2>

      <input
        placeholder="Klant"
        value={klant}
        onChange={(e) => setKlant(e.target.value)}
      />

      <textarea
        placeholder="Werkzaamheden"
        value={werk}
        onChange={(e) => setWerk(e.target.value)}
      ></textarea>

      <button onClick={toevoegen}>
        Werkbon opslaan
      </button>

      {werkbonnen.map((w) => (
        <div className="list-item" key={w.id}>
          <strong>{w.klant}</strong>
          <p>{w.werk}</p>
        </div>
      ))}
    </div>
  );
}

function Urenregistratie({ uren, setUren }) {
  const [medewerker, setMedewerker] = useState("");
  const [project, setProject] = useState("");
  const [aantal, setAantal] = useState("");

  function toevoegen() {
    if (!medewerker || !project || !aantal) return;

    setUren([
      ...uren,
      {
        id: Date.now(),
        medewerker,
        project,
        aantal
      }
    ]);

    setMedewerker("");
    setProject("");
    setAantal("");
  }

  return (
    <div className="page-card">
      <h2>Urenregistratie</h2>

      <input
        placeholder="Medewerker"
        value={medewerker}
        onChange={(e) => setMedewerker(e.target.value)}
      />

      <input
        placeholder="Project"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      />

      <input
        type="number"
        placeholder="Aantal uren"
        value={aantal}
        onChange={(e) => setAantal(e.target.value)}
      />

      <button onClick={toevoegen}>
        Uren opslaan
      </button>

      {uren.map((u) => (
        <div className="list-item" key={u.id}>
          <strong>{u.medewerker}</strong>
          <p>
            {u.project} - {u.aantal} uur
          </p>
        </div>
      ))}
    </div>
  );
}

function Facturen({ facturen, setFacturen }) {
  const [klant, setKlant] = useState("");
  const [bedrag, setBedrag] = useState("");

  function toevoegen() {
    if (!klant || !bedrag) return;

    setFacturen([
      ...facturen,
      {
        id: Date.now(),
        klant,
        bedrag
      }
    ]);

    setKlant("");
    setBedrag("");
  }

  return (
    <div className="page-card">
      <h2>Facturen</h2>

      <input
        placeholder="Klant"
        value={klant}
        onChange={(e) => setKlant(e.target.value)}
      />

      <input
        type="number"
        placeholder="Bedrag"
        value={bedrag}
        onChange={(e) => setBedrag(e.target.value)}
      />

      <button onClick={toevoegen}>
        Factuur toevoegen
      </button>

      {facturen.map((f) => (
        <div className="invoice" key={f.id}>
          <div className="icon">€</div>

          <div>
            <strong>{f.klant}</strong>
            <p>€ {Number(f.bedrag).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Instellingen() {
  return (
    <div className="page-card">
      <h2>Instellingen</h2>

      <input placeholder="Bedrijfsnaam" />
      <input placeholder="E-mail" />
      <input placeholder="Telefoonnummer" />

      <button>Opslaan</button>
    </div>
  );
}
