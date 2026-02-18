import { useState, useEffect } from "react";
import { creaRecensione, getRecensioni, eliminaRecensioneAPI, modificaRecensioneAPI } from "../api";

function Recensioni({ libroId }) {
  const [recensioni, setRecensioni] = useState([]);
  const [testo, setTesto] = useState("");
  const [stelle, setStelle] = useState(5);

  const fetchRecensioni = () => getRecensioni(libroId).then(setRecensioni);

  useEffect(() => {
    fetchRecensioni();
  }, [libroId]);

  const inviaRecensione = async (e) => {
    e.preventDefault();
    await creaRecensione({ libroId, testo, stelle });
    setTesto("");
    setStelle(5);
    fetchRecensioni();
  };

  const eliminaRecensione = async (id) => {
    if (!window.confirm("Vuoi davvero eliminare la recensione?")) return;
    await eliminaRecensioneAPI(id);
    fetchRecensioni();
  };

  const modificaRecensione = async (id, nuovoTesto, nuoveStelle) => {
    await modificaRecensioneAPI(id, { testo: nuovoTesto, stelle: nuoveStelle });
    fetchRecensioni();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Recensioni</h3>
      {recensioni.length === 0 && <p>Nessuna recensione</p>}
      {recensioni.map(r => (
        <div key={r.id} style={{ marginBottom: "10px" }}>
          <strong>{r.user}</strong> ({r.stelle}⭐): {r.testo}
          {r.ownedByUser && (
            <>
              <button style={{ marginLeft: "10px" }} onClick={() => eliminaRecensione(r.id)}>Elimina</button>
              <button style={{ marginLeft: "5px" }} onClick={() => {
                const nuovoTesto = prompt("Modifica recensione", r.testo);
                const nuoveStelle = prompt("Modifica stelle (1-5)", r.stelle);
                if (nuovoTesto && nuoveStelle) modificaRecensione(r.id, nuovoTesto, parseInt(nuoveStelle));
              }}>Modifica</button>
            </>
          )}
        </div>
      ))}

      <form onSubmit={inviaRecensione} style={{ marginTop: "10px" }}>
        <textarea value={testo} onChange={e => setTesto(e.target.value)} placeholder="Scrivi una recensione..." required />
        <input type="number" min="1" max="5" value={stelle} onChange={e => setStelle(e.target.value)} />
        <button type="submit">Invia recensione</button>
      </form>
    </div>
  );
}

export default Recensioni;


