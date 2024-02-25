import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MouseParticles from "react-mouse-particles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <MouseParticles
          g={1}
          color="random"
          cull="MuiSvgIcon-root,MuiButton-root"
          level={6}
        />
  </React.StrictMode>
);
