import { useNavigate } from "react-router-dom";
import { creaPrenotazione } from "../api";

function Cart({ carrello, rimuoviDalCarrello, svuotaCarrello }) {
  const navigate = useNavigate();

  const totale = carrello.reduce(
    (sum, l) => sum + l.prezzo * l.quantita,
    0
  );

  async function acquista() {
    if (carrello.length === 0) {
      alert("Il carrello è vuoto!");
      return;
    }

    try {
      // chiamata backend per ogni libro
      for (const libro of carrello) {
        for (let i = 0; i < libro.quantita; i++) {
          await creaPrenotazione(libro.id);
        }
      }

      alert("Prenotazione completata!");
      svuotaCarrello();
      navigate("/biblioteca");
    } catch (err) {
      alert("Errore durante la prenotazione");
    }
  }

  if (carrello.length === 0) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Carrello vuoto</h2>
        <button onClick={() => navigate("/biblioteca")}>
          Torna alla biblioteca
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>🛒 Carrello</h1>

      {carrello.map((l) => (
        <div key={l.id} style={{ marginBottom: "10px" }}>
          <strong>{l.titolo}</strong> x {l.quantita} — €{l.prezzo * l.quantita}
          <button onClick={() => rimuoviDalCarrello(l.id)}>Rimuovi</button>


        </div>
      ))}

      <hr />

      <h3>Totale: €{totale}</h3>

      <button onClick={svuotaCarrello}>Svuota</button>
      <button onClick={acquista} style={{ marginLeft: "10px" }}>
        Prenota
      </button>

      <br /><br />

      <button onClick={() => navigate("/biblioteca")}>
        Torna alla biblioteca
      </button>
    </div>
  );
}

export default Cart;


