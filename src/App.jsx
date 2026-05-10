import { useState } from "react";

export default function App() {
  const [facturen, setFacturen] = useState([]);
  const [klant, setKlant] = useState("");
  const [omschrijving, setOmschrijving] = useState("");
  const [bedrag, setBedrag] = useState("");

  const openstaand = facturen.filter((f) => f.status === "Openstaand");
  const verstuurd = facturen.filter((f) => f.status === "Verstuurd");
  const betaald = facturen.filter((f) => f.status === "Betaald");

  const totaalOpenstaand = openstaand.reduce(
    (som, f) => som + Number(f.bedrag),
    0
  );

  function factuurToevoegen() {
    if (!klant || !omschrijving || !bedrag) return;

    setFacturen([
      ...facturen,
      {
        id: Date.now(),
        nummer: `MRK-${facturen.length + 1}`,
        klant,
        omschrijving,
        bedrag,
        status: "Openstaand",
      },
    ]);

    setKlant("");
    setOmschrijving("");
    setBedrag("");
  }

  function statusWijzigen(id, nieuweStatus) {
    setFacturen(
      facturen.map((f) =>
        f.id === id ? { ...f, status: nieuweStatus } : f
      )
    );
  }

  return (
    <div className="app">
      <header>
        <h1>MRK Administratie Dashboard</h1>
        <p>Facturen, openstaande bedragen en betaalstatus</p>
      </header>

      <section className="cards">
        <div className="card">
          <h2>Openstaand</h2>
          <h1>€ {totaalOpenstaand.toFixed(2)}</h1>
          <p>{openstaand.length} openstaande facturen</p>
        </div>

        <div className="card">
          <h2>Verstuurd</h2>
          <h1>{verstuurd.length}</h1>
          <p>Verstuurde facturen</p>
        </div>

        <div className="card">
          <h2>Betaald</h2>
          <h1>{betaald.length}</h1>
          <p>Betaalde facturen</p>
        </div>
      </section>

      <section className="card wide">
        <h2>Nieuwe factuur</h2>

        <input
          placeholder="Klantnaam"
          value={klant}
          onChange={(e) => setKlant(e.target.value)}
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

        <button onClick={factuurToevoegen}>Factuur toevoegen</button>
      </section>

      <section className="card wide">
        <h2>Facturen overzicht</h2>

        <table>
          <thead>
            <tr>
              <th>Factuurnr.</th>
              <th>Klant</th>
              <th>Omschrijving</th>
              <th>Bedrag</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {facturen.map((factuur) => (
              <tr key={factuur.id}>
                <td>{factuur.nummer}</td>
                <td>{factuur.klant}</td>
                <td>{factuur.omschrijving}</td>
                <td>€ {Number(factuur.bedrag).toFixed(2)}</td>
                <td>
                  <select
                    value={factuur.status}
                    onChange={(e) =>
                      statusWijzigen(factuur.id, e.target.value)
                    }
                  >
                    <option>Openstaand</option>
                    <option>Verstuurd</option>
                    <option>Betaald</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
