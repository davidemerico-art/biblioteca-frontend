import { libri as libriMock } from "./data/libri";

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
  if (USE_MOCK) {
    return Promise.resolve(libriMock);
  }
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
  console.log("BODY INVIATO:", credentials);

  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const text = await res.text();
  console.log("RISPOSTA SERVER:", text);

  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}

//
// ---------- RESERVATIONS ----------
//

export async function creaPrenotazione(bookId) {
  if (USE_MOCK) return Promise.resolve({ success: true });
  const res = await fetch(`${API_URL}/reservations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ book_id: bookId }),
  });
  if (!res.ok) throw new Error("Errore prenotazione");
  return res.json();
}
