import { useEffect, useState } from "react";
import { getLibri } from "../api";
import Book from "../components/Book";
import { Link, useNavigate } from "react-router-dom";

function Biblioteca({ aggiungiAlCarrello, logout }) {
  const [libri, setLibri] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLibri().then(setLibri);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Biblioteca</h1>

      <button onClick={logout}>Logout</button>

      <Link to="/carrello" style={{ marginLeft: "20px" }}>
        <span className="material-symbols-outlined">shopping_cart</span>
      </Link>

      <Link to="/crea-libro" style={{ fontSize: "24px", marginLeft: "20px" }}>
  <span className="material-symbols-outlined">add</span>
</Link>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
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


