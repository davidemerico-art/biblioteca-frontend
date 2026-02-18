import { useEffect, useState } from "react";
import { getLibri } from "../api";
import Book from "../components/Book";
import { Link, useNavigate } from "react-router-dom";

function Biblioteca({ aggiungiAlCarrello, logout }) {
  const [libri, setLibri] = useState([]);
  const [search, setSearch] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      getLibri(search).then(setLibri); 
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

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

      
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Cerca libro per titolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            fontSize: "16px",
          }}
        />
      </div>

      
      {search && libri.length === 0 && (
        <p style={{ color: "red", marginTop: "20px" }}>
          Il libro non è disponibile.
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
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
