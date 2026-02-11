import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
  console.log("LOGIN BODY:", { email, password });

  const data = await login({ email, password });

  console.log("RISPOSTA:", data);

  onLogin(data.access_token || data.token);

  navigate("/biblioteca");
} catch (err) {
  console.error(err);
  alert("Login fallito");
}

  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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
      />

  
  <button type="submit">Login</button>
</form>
     
 
  );
}

export default Login;


