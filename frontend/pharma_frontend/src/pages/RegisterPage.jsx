import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      alert("Compte créé !");
      navigate("/login");
    } catch {
      alert("Erreur création compte");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-logo">PharmaSys</h1>
        <p className="auth-subtitle">Créer un compte</p>

        <form onSubmit={submit} className="auth-form">

          <input
            placeholder="Nom d'utilisateur"
            onChange={(e)=>setForm({...form,username:e.target.value})}
          />

          <input
            placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            placeholder="Prénom"
            onChange={(e)=>setForm({...form,first_name:e.target.value})}
          />

          <input
            placeholder="Nom"
            onChange={(e)=>setForm({...form,last_name:e.target.value})}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <button type="submit">Créer un compte</button>

        </form>

        <p className="auth-footer">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;