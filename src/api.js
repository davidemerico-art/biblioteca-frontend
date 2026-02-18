import { libri as libriMock } from "./data/libri";

let recensioniMock = [];
let nextRecensioneId = 1;

const API_URL = "http://localhost:8000";
const USE_MOCK = true; 

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

//
// ---------- BOOKS ----------
//


function getStoredLibri() {
  const stored = localStorage.getItem("libri");

  if (stored) return JSON.parse(stored);

  localStorage.setItem("libri", JSON.stringify(libriMock));
  return libriMock;
}

export const getLibri = async (search = "") => {
  if (USE_MOCK) {
    const libri = getStoredLibri();

    return Promise.resolve(
      libri.filter(
        (l) =>
          l.titolo &&
          l.titolo.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  const res = await fetch(`${API_URL}/books/?search=${search}`);
  if (!res.ok) throw new Error("Errore caricamento libri");
  return res.json();
};

export const getLibroById = async (id) => {
  if (USE_MOCK) {
    const libri = getStoredLibri();

    return Promise.resolve(
      libri.find((l) => l.id === parseInt(id))
    );
  }

  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) throw new Error("Libro non trovato");
  return res.json();
};

export const creaLibro = async (libro) => {
  if (USE_MOCK) {
    const libri = getStoredLibri();

    const nuovoLibro = {
      id: Date.now(),
      ...libro,
      prezzo: Number(libro.prezzo),
    };

    const aggiornati = [...libri, nuovoLibro];

    localStorage.setItem("libri", JSON.stringify(aggiornati));

    return Promise.resolve(nuovoLibro);
  }

  const res = await fetch(`${API_URL}/books/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(libro),
  });

  if (!res.ok) throw new Error("Errore creazione libro");
  return res.json();
};

export const restituisciLibro = async (bookId) => {
  if (USE_MOCK) return Promise.resolve({ success: true });

  const res = await fetch(`${API_URL}/reservations/${bookId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Errore restituzione libro");
  return res.json();
};

//
// ---------- AUTH ----------
//

export async function register(user) {
  if (USE_MOCK) return Promise.resolve({ id: 1, ...user });

  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Errore registrazione");
  return res.json();
}

export async function login(credentials) {
  if (USE_MOCK) return Promise.resolve({ token: "mock-token" });

  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Login fallito");
  return res.json();
}

//
// ---------- RESERVATIONS ----------
//

export async function creaPrenotazione(bookId) {
  if (USE_MOCK) return Promise.resolve({ success: true });

  const res = await fetch(`${API_URL}/reservations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ book_id: bookId }),
  });

  if (!res.ok) throw new Error("Errore prenotazione");
  return res.json();
}
//
// ---------- RECENSIONI ----------
//

function getStoredRecensioni() {
  const stored = localStorage.getItem("recensioni");

  if (stored) return JSON.parse(stored);

  localStorage.setItem("recensioni", JSON.stringify([]));
  return [];
}

export const getRecensioni = async (libroId) => {
  if (USE_MOCK) {
    const recensioni = getStoredRecensioni();

    return Promise.resolve(
      recensioni.filter((r) => r.libroId === libroId)
    );
  }

  const res = await fetch(`${API_URL}/reviews/${libroId}`);
  if (!res.ok) throw new Error("Errore caricamento recensioni");
  return res.json();
};

export const creaRecensione = async ({ libroId, testo, stelle }) => {
  if (USE_MOCK) {
    const recensioni = getStoredRecensioni();

    const nuova = {
      id: Date.now(),
      libroId,
      testo,
      stelle,
      user: "Tu",
      ownedByUser: true,
    };

    const aggiornate = [...recensioni, nuova];

    localStorage.setItem("recensioni", JSON.stringify(aggiornate));

    return Promise.resolve(nuova);
  }

  const res = await fetch(`${API_URL}/reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ book_id: libroId, testo, stelle }),
  });

  if (!res.ok) throw new Error("Errore creazione recensione");
  return res.json();
};

export const eliminaRecensioneAPI = async (id) => {
  if (USE_MOCK) {
    const recensioni = getStoredRecensioni();

    const aggiornate = recensioni.filter((r) => r.id !== id);

    localStorage.setItem("recensioni", JSON.stringify(aggiornate));

    return Promise.resolve({ success: true });
  }

  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Errore eliminazione recensione");
  return res.json();
};

export const modificaRecensioneAPI = async (id, dati) => {
  if (USE_MOCK) {
    const recensioni = getStoredRecensioni();

    const aggiornate = recensioni.map((r) =>
      r.id === id ? { ...r, ...dati } : r
    );

    localStorage.setItem("recensioni", JSON.stringify(aggiornate));

    return Promise.resolve({ success: true });
  }

  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(dati),
  });

  if (!res.ok) throw new Error("Errore modifica recensione");
  return res.json();
};
