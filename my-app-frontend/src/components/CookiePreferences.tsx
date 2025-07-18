import styled from "styled-components";
import { useState } from "react";
import Button from "./Button";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background-color: var(--color4);
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const CookiePreferences = ({ onClose }: { onClose: () => void }) => {
  const [stats, setStats] = useState(true);
  const [ads, setAds] = useState(false);

  const savePreferences = () => {
    const preferences = {
      stats,
      ads,
    };
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <h2>Préférences de cookies</h2>
        <p>Vous pouvez choisir les types de cookies que vous acceptez :</p>
        <label>
          <input type="checkbox" disabled checked /> Cookies essentiels (toujours actifs)
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={stats}
            onChange={() => setStats(!stats)}
          />
          Cookies statistiques (ex: Google Analytics)
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={ads}
            onChange={() => setAds(!ads)}
          />
          Cookies marketing / publicitaires
        </label>
        <br /><br />
        <div style={{display:'flex',gap:10, padding:10}}>
            <Button width="150" text='Sauvegarder' onClick={savePreferences} variant="type1"></Button>
            <Button width="150"  text='Annuler' onClick={onClose} variant="type2"></Button>
        </div>

      </Modal>
    </Overlay>
  );
};

export default CookiePreferences;
