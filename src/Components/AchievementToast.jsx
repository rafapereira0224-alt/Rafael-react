import { useEffect } from "react";
import "./AchievementToast.css"; // Vamos criar o estilo logo abaixo

export default function AchievementToast({ conquista, onClose }) {
  useEffect(() => {
    // A notificaçãosome sozinha após 4 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [conquista, onClose]);

  if (!conquista) return null;

  return (
    <div className="achievement-toast">
      <div className="toast-icon">🏆</div>
      <div className="toast-content">
        <span className="toast-title">Nova Conquista Desbloqueada!</span>
        <h4 className="toast-name">{conquista.title}</h4>
        <p className="toast-desc">{conquista.description}</p>
      </div>
    </div>
  );
}