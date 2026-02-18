import { libri as libriMock } from "./data/libri";

let recensioniMock = []; // mock per recensioni
let nextRecensioneId = 1;

const API_URL = "http://localhost:8000";
const USE_MOCK = true; // metti false per usare il backend reale

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

//
// ---------- BOOKS ----------
//

export const getLibri = async () => {
  if (USE_MOCK) return Promise.resolve(libriMock);
  const res = await fetch(`${API_URL}/books/`);
  if (!res.ok) throw new Error("Errore caricamento libri");
  return res.json();
};

export const getLibroById = async (id) => {
  if (USE_MOCK) {
    const libro = libriMock.find((l) => l.id === parseInt(id));
    return Promise.resolve(libro);
  }
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) throw new Error("Libro non trovato");
  return res.json();
};

export const creaLibro = async (libro) => {
  if (USE_MOCK) {
    const nuovoLibro = { id: libriMock.length + 1, ...libro };
    libriMock.push(nuovoLibro);
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

export const getRecensioni = async (libroId) => {
  if (USE_MOCK) return Promise.resolve(recensioniMock.filter(r => r.libroId === libroId));
  const res = await fetch(`${API_URL}/reviews/${libroId}`);
  if (!res.ok) throw new Error("Errore caricamento recensioni");
  return res.json();
};

export const creaRecensione = async ({ libroId, testo, stelle }) => {
  if (USE_MOCK) {
    const nuova = { id: nextRecensioneId++, libroId, testo, stelle, user: "Tu", ownedByUser: true };
    recensioniMock.push(nuova);
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
    recensioniMock = recensioniMock.filter(r => r.id !== id);
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
    recensioniMock = recensioniMock.map(r => r.id === id ? { ...r, ...dati } : r);
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
