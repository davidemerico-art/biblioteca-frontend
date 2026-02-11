import { Link } from "react-router-dom";

function Book({ libro, aggiungiAlCarrello }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px",
        width: "200px",
        textAlign: "center"
      }}
    >
      <Link to={`/libro/${libro.id}`}>
        <img
          src={libro.img}
          alt={libro.titolo}
          width="150"
          style={{ cursor: "pointer" }}
        />
      </Link>

      <h3>{libro.titolo}</h3>
      <p>€{libro.prezzo}</p>

      <button onClick={() => aggiungiAlCarrello(libro)}>
        Aggiungi al carrello
      </button>
    </div>
  );
}

export default Book;

