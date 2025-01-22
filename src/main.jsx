import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';  // Assurez-vous que App.jsx est bien importé
import './index.css';     // Importation des styles globaux
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS

// import axiosClient from './api/axios';  // Configuration Axios

// // Appel pour récupérer le cookie CSRF dès que l'application démarre
// axiosClient.get('/sanctum/csrf-cookie')
//   .then(() => {
//     console.log('CSRF cookie retrieved successfully');
//   })
//   .catch(error => {
//     console.error('Error retrieving CSRF cookie:', error);
//   });

// Création du root React et rendu de l'application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
