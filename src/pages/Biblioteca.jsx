import { useEffect, useState } from "react";
import { getLibri } from "../api";
import Book from "../components/Book";
import { Link } from "react-router-dom";

function Biblioteca({ aggiungiAlCarrello, logout }) {
  const [libri, setLibri] = useState([]);

  useEffect(() => {
    getLibri().then(setLibri);
  }, []);

  return (
    <div>
      <h1>Biblioteca</h1>

      <button onClick={logout}>Logout</button>
     <Link to="/carrello" style={{ marginLeft: "20px" }}>
  <span className="material-symbols-outlined">
    shopping_cart
  </span>
</Link>


      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {libri.map((libro) => (
          <Book
            key={libro.id}
            libro={libro}
            aggiungiAlCarrello={aggiungiAlCarrello}
          />
        ))}
      </div>
    </div>
  );
}

export default Biblioteca;

