import React from "react";
import "./ConquistasModal.css"; // Vamos estilizar logo abaixo

function ConquistasModal({ isOpen, onClose, achievements }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <h2>🏆 Mural de Conquistas</h2>
        <p className="modal-sub">Evolua guerreiros e personalize seu treino para desbloquear troféus!</p>

        <div className="lista-conquistas">
          {achievements && achievements.map((ach) => (
            <div 
              key={ach.id} 
              className={`item-conquista ${ach.unlocked ? "desbloqueada" : "bloqueada"}`}
            >
              <span className="icone-trofeu">{ach.unlocked ? "🌟" : "🔒"}</span>
              <div className="detalhes-conquista">
                <h4>{ach.title}</h4>
                <p>{ach.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-fechar-modal" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default ConquistasModal;