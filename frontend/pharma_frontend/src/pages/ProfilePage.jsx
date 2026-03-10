import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="page-container">
      <h1>Profil utilisateur</h1>

      <div className="profile-card">
        <p><strong>Username :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Prénom :</strong> {user.first_name}</p>
        <p><strong>Nom :</strong> {user.last_name}</p>
      </div>
    </div>
  );
}