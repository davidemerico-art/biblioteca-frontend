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

      <Link to="/carrello">Carrello</Link>

      <div>
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
