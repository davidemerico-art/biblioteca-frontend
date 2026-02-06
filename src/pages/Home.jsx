import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      <h1> Biblioteca Online</h1>
      <p>Accedi o registrati per vedere i libri e prenotarli</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>Login</button>
        </Link>

        <Link to="/register">
          <button>Registrati</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
