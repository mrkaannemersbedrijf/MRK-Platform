import { useState } from "react";

export default function App() {
  const [klanten, setKlanten] = useState([]);
  const [uren, setUren] = useState([]);

  const [klant, setKlant] = useState("");
  const [project, setProject] = useState("");
  const [aantalUren, setAantalUren] = useState("");
  const [tarief, setTarief] = useState("55");

  const totaal = uren.reduce(
    (som, regel) => som + Number(regel.uren) * Number(regel.tarief),
    0
  );

  function klantToevoegen() {
    if (!klant) return;
    setKlanten([...klanten, klant]);
    setKlant("");
  }

  function urenToevoegen() {
    if (!project || !aantalUren) return;

    setUren([
      ...uren,
      {
        klant,
        project,
        uren: aantalUren,
        tarief,
      },
    ]);

    setProject("");
    setAantalUren("");
  }

  return (
    <div className="app">
      <header>
        <h1>MRK Administratie Platform</h1>
        <p>Werkbonnen, urenregistratie en facturen</p>
      </header>

      <section className="cards">
        <div className="card">
          <h2>Klanten</h2>
          <input
            placeholder="Klantnaam"
            value={klant}
            onChange={(e) => setKlant(e.target.value)}
          />
          <button onClick={klantToevoegen}>Klant toevoegen</button>

          <ul>
            {klanten.map((k, index) => (
              <li key={index}>{k}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Urenregistratie</h2>
          <input
            placeholder="Project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <input
            placeholder="Aantal uren"
            type="number"
            value={aantalUren}
            onChange={(e) => setAantalUren(e.target.value)}
          />
          <input
            placeholder="Uurtarief"
            type="number"
            value={tarief}
            onChange={(e) => setTarief(e.target.value)}
          />
          <button onClick={urenToevoegen}>Uren opslaan</button>
        </div>

        <div className="card">
          <h2>Factuur</h2>
          <p>Totaal excl. btw: € {totaal.toFixed(2)}</p>
          <p>BTW 21%: € {(totaal * 0.21).toFixed(2)}</p>
          <h3>Totaal: € {(totaal * 1.21).toFixed(2)}</h3>
          <button onClick={() => window.print()}>Factuur printen</button>
        </div>
      </section>

      <section className="card wide">
        <h2>Urenregels</h2>
        <table>
          <thead>
            <tr>
              <th>Klant</th>
              <th>Project</th>
              <th>Uren</th>
              <th>Tarief</th>
              <th>Bedrag</th>
            </tr>
          </thead>
          <tbody>
            {uren.map((regel, index) => (
              <tr key={index}>
                <td>{regel.klant}</td>
                <td>{regel.project}</td>
                <td>{regel.uren}</td>
                <td>€ {regel.tarief}</td>
                <td>€ {(regel.uren * regel.tarief).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
