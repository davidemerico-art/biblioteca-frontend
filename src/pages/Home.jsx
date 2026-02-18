import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "60px",
          marginTop: "80px",
          marginBottom: "40px"
        }}
      >
        Biblioteca Online
      </h1>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
      >
        {/* Testo centrale */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "28px", margin: "10px 0" }}>
           in questa biblioteca online puoi:
          </p>
          <p style={{ fontSize: "28px", margin: "10px 0" }}>
            Leggere le recensioni
          </p>
          <p style={{ fontSize: "28px", margin: "10px 0" }}>
            Leggegere le descrizione dei libri
          </p>
          <p style={{ fontSize: "28px", margin: "10px 0" }}>
            vedere i libri nel catalogo
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            right: "30px"
          }}
        >
          <Link to="/login">
            <button style={{ marginRight: "10px" }}>Login</button>
          </Link>

          <Link to="/register">
            <button>Registrati</button>
          </Link>
        </div>
      </div>
      <div
        style={{
          height: "500px",
          backgroundImage:
            "url('https://media.cultura.gov.it/mibac/files/5108/Sala%20della%20Crociera%201.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
    </div>
  );
}

export default Home;
