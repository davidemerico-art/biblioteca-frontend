import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Biblioteca from "./pages/Biblioteca";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [carrello, setCarrello] = useState([]);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCarrello([]);
  };

  const PrivateRoute = ({ children }) =>
    token ? children : <Navigate to="/login" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/biblioteca"
          element={
            <PrivateRoute>
              <Biblioteca logout={logout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/libro/:id"
          element={
            <PrivateRoute>
              <BookDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/carrello"
          element={
            <PrivateRoute>
              <Cart carrello={carrello} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
