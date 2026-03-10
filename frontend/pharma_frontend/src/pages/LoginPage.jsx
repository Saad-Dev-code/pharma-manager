import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {


  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);

 

      navigate("/");
    } catch {
      alert("Identifiants incorrects");
    }
  };



  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-logo">PharmaSys</h1>
        <p className="auth-subtitle">Connexion à votre espace pharmacie</p>

        <form onSubmit={submit} className="auth-form">

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Se connecter</button>

        </form>

        <p className="auth-footer">
          Pas de compte ? <Link to="/register">Créer un compte</Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;