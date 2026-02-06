import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLibroById } from "../api";

function BookDetail() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    getLibroById(id).then(setLibro);
  }, [id]);

  if (!libro) return <p>Caricamento...</p>;

  return (
    <div>
      <h2>{libro.titolo}</h2>
      <p>{libro.autore}</p>
      <p>€{libro.prezzo}</p>
      <p>{libro.descrizione}</p>
      <p>{libro.categoria}</p>
      <p>{libro.fraseCelebre}</p>
    </div>
  );
}

export default BookDetail;


