import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../componats/Navbar.jsx';
import Footer from '../componats/Footer.jsx';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client.js';

export default function Layout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  // // Redirection vers la page de connexion si aucun token n'est présent
  // if (!token) {
  //   return <Navigate to="/" />;
  // }


  // Chargement des informations utilisateur à l'initialisation
  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">
        <Outlet />
      </main>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <Footer />
    </>
  );
}
