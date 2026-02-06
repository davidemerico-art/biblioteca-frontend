import { Link } from "react-router-dom";

function Book({ libro, aggiungiAlCarrello }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px",
        width: "200px"
      }}
    >
      <img
        src={libro.img}
        alt={libro.titolo}
        width="120"
      />

      <h3>{libro.titolo}</h3>
     <p>{libro.autore}</p>
      <p>€{libro.prezzo}</p>
      <p>{libro.descrizione}</p>
      <p>{libro.categoria}</p>
      <p>{libro.fraseCelebre}</p>

      <Link to={`/libro/${libro.id}`}>
        <button>Dettagli</button>
      </Link>

      <button onClick={() => aggiungiAlCarrello(libro)}>
        Aggiungi al carrello
      </button>
    </div>
  );
}

export default Book;
