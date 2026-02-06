const API_URL = "http://localhost:8000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ---------- LIBRI ---------- */

export async function getLibri() {
  const res = await fetch(`${API_URL}/libri`);
  if (!res.ok) throw new Error("Errore caricamento libri");
  return res.json();
}

export async function getLibroById(id) {
  const res = await fetch(`${API_URL}/libri/${id}`);
  if (!res.ok) throw new Error("Libro non trovato");
  return res.json();
}

/* ---------- AUTH ---------- */

export async function login(credentials) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Login fallito");

  return res.json(); // ritorna access_token
}

export async function register(user) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Errore registrazione");

  return res.json();
}

/* ---------- PRENOTAZIONE (se ti serve) ---------- */

export async function creaPrenotazione(bookId) {
  const res = await fetch(`${API_URL}/reservations/${bookId}`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Errore prenotazione");

  return res.json();
}

    