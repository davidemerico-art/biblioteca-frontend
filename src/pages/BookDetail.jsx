import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLibroById } from "../api";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    getLibroById(id).then(setLibro);
  }, [id]);

  if (!libro) return <p>Caricamento...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/biblioteca")}>
        ← Torna indietro
      </button>

      <div style={{ marginTop: "20px" }}>
        <img src={libro.img} alt={libro.titolo} width="200" />

        <h2>{libro.titolo}</h2>
        <h4>{libro.autore}</h4>
        <p>€{libro.prezzo}</p>
        <p>{libro.descrizione}</p>
      </div>
    </div>
  );
}

export default BookDetail;



