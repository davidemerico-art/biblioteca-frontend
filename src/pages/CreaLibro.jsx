import { useState } from "react";
import { creaLibro } from "../api"; 
import { useNavigate } from "react-router-dom";

function CreaLibro() {
  const [titolo, setTitolo] = useState("");
  const [autore, setAutore] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await creaLibro({ titolo, autore, prezzo, descrizione, img });
      alert("Libro creato!");
      navigate("/biblioteca");
    } catch (err) {
      console.error(err);
      alert("Errore creazione libro");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Nuovo Libro</h2>
      <input placeholder="Titolo" value={titolo} onChange={e => setTitolo(e.target.value)} required />
      <input placeholder="Autore" value={autore} onChange={e => setAutore(e.target.value)} required />
      <input type="number" placeholder="Prezzo" value={prezzo} onChange={e => setPrezzo(e.target.value)} required />
      <input placeholder="Descrizione" value={descrizione} onChange={e => setDescrizione(e.target.value)} required />
      <input placeholder="URL immagine" value={img} onChange={e => setImg(e.target.value)} required />
      <button type="submit">Crea</button>
    </form>
  );
}

export default CreaLibro;

