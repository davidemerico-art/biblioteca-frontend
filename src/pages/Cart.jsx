import { useNavigate } from "react-router-dom";
import { creaPrenotazione } from "../api";

function Cart({ carrello = [], rimuoviDalCarrello, svuotaCarrello }) {
  const navigate = useNavigate();

  // Calcolo totale in sicurezza
  const totale = carrello?.reduce((sum, libro) => {
    const prezzo = libro?.prezzo ?? 0;
    const quantita = libro?.quantita ?? 0;
    return sum + prezzo * quantita;
  }, 0);

  // Funzione per prenotare
  async function acquista() {
    if (!carrello || carrello.length === 0) {
      alert("Il carrello è vuoto!");
      return;
    }

    try {
      for (const libro of carrello) {
        const quantita = libro?.quantita ?? 0;
        for (let i = 0; i < quantita; i++) {
          await creaPrenotazione(libro.id);
        }
      }

      alert("Prenotazione completata!");
      svuotaCarrello?.();
      navigate("/biblioteca");
    } catch (err) {
      console.error(err);
      alert("Errore durante la prenotazione");
    }
  }

  // Se il carrello è vuoto
  if (!carrello || carrello.length === 0) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Carrello vuoto</h2>
        <button onClick={() => navigate("/biblioteca")}>
          Torna alla biblioteca
        </button>
      </div>
    );
  }

  // Render del carrello con tutti i controlli
  return (
    <div style={{ padding: "40px" }}>
      <h1>Carrello</h1>

      {carrello.map((libro) => (
        <div key={libro.id} style={{ marginBottom: "10px" }}>
          <strong>{libro.titolo ?? "Titolo sconosciuto"}</strong> x{" "}
          {libro.quantita ?? 0} — €{(libro.prezzo ?? 0) * (libro.quantita ?? 0)}
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => rimuoviDalCarrello?.(libro.id)}
          >
            Rimuovi
          </button>
        </div>
      ))}

      <hr />

      <h3>Totale: €{totale}</h3>

      <button onClick={() => svuotaCarrello?.()}>Svuota</button>
      <button onClick={acquista} style={{ marginLeft: "10px" }}>
        Prenota
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/biblioteca")}>
        Torna alla biblioteca
      </button>
    </div>
  );
}

export default Cart;



