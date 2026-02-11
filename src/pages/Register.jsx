import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register({ name, email, password });
      alert("Registrazione completata!");
      navigate("/login");
    } catch (err) {
     
      if (err.response && err.response.data && err.response.data.detail) {
        alert(err.response.data.detail);
      } else {
        alert("Errore registrazione");
      }
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrati</h2>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}    
        maxLength={72}   
      />

      <button type="submit">Registrati</button>
    </form>
  );
}

export default Register;
