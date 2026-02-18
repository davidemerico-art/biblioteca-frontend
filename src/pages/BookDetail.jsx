import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLibroById, restituisciLibro } from "../api";
import Recensioni from "../components/Recensioni";

function BookDetail({ carrello, setCarrello }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    getLibroById(id).then(setLibro);
  }, [id]);

  if (!libro) return <p>Caricamento...</p>;

  const prenotato = carrello.find(l => l.id === libro.id);

  async function handleRestituisci() {
    if (!prenotato) return;
    try {
      await restituisciLibro(libro.id);
      setCarrello(prev => prev
        .map(l => l.id === libro.id ? { ...l, quantita: l.quantita - 1 } : l)
        .filter(l => l.quantita > 0)
      );
      alert("Libro restituito!");
    } catch {
      alert("Errore durante la restituzione");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/biblioteca")}>← Torna indietro</button>
      <div style={{ marginTop: "20px" }}>
        <img src={libro.img} alt={libro.titolo} width="200" />
        <h2>{libro.titolo}</h2>
        <h4>{libro.autore}</h4>
        <p>€{libro.prezzo}</p>
        <p>{libro.descrizione}</p>

        {prenotato && (
          <button onClick={handleRestituisci} style={{ marginTop: "10px" }}>
            Restituisci
          </button>
        )}

       
        <Recensioni libroId={libro.id} />
      </div>
    </div>
  );
}

export default BookDetail;





