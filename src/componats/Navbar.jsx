import React, { useState } from 'react';
import { MenuItems } from './MenuItems.jsx';
import './NavbarStyle.css';
import SignUpPopup from './SignUpPopup.jsx';
import SignInPopup from './SignInPopup.jsx';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from "../context/ContextProvider.jsx";
import {useEffect} from "react";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const { user, setUser, setToken } = useStateContext(); // Access user from context
  
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(''); // New state for logout message


  const handleSignInSuccess = ({ user, token }) => {
    setUser(user); // Set the user data returned from the sign-in response
    setToken(token); // Store token in context
    localStorage.setItem('ACCESS_TOKEN', token); // Save token for subsequent requests
};

const handleSignUpSuccess = ({ user, token }) => {
    setUser(user); // Set the user data returned from the sign-up response
    setToken(token); // Store token in context
    localStorage.setItem('ACCESS_TOKEN', token); // Save token for subsequent requests
};
  const handleClick = () => {
    setClicked(!clicked);
  };

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  const handleSignOut = async () => {
    try {
        await axiosClient.post('/logout');
        setUser(null);
        setToken(null);
        localStorage.removeItem('ACCESS_TOKEN'); // Clear token from local storage
        console.log('Logout successful!');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

useEffect(() => {
  console.log('Current user state:', user);
}, [user]);

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data); // User authenticated successfully
                console.log('User authenticated:', data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log('User not authenticated');
                    setUser(null);
                } else {
                    console.error('Error fetching user:', error);
                }
            });
    } else {
        console.log('No token found');
        setUser(null);
    }


  //     axiosClient.get('/sanctum/csrf-cookie')
  //     .then(() => {
  //       axiosClient.get('/user')
  //         .then(({ data }) => {
  //           console.log('Authenticated User:', data);
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching user:', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('CSRF Cookie Error:', error);
  //     });

  }, []);

  if (user)  {
    console.log('User is authenticated');
  }; 


  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Travelor</h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.url} className={item.cName}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
{user && user.id ? (  // Si l'utilisateur est authentifié (vérification explicite)
  <li>
    <button onClick={handleSignOut} className="btn-logout">Sign Out</button>
  </li>
) : ( // Si aucun utilisateur n'est authentifié
  <>
    <li>
      <button onClick={() => setShowSignUp(true)}>Sign Up</button>
    </li>
    <li>
      <button onClick={() => setShowSignIn(true)}>Sign In</button>
    </li>
  </>
)}
      </ul>
      {showSignUp && <SignUpPopup closePopup={() => setShowSignUp(false)} onSignUpSuccess={handleSignUpSuccess} />}
      {showSignIn && <SignInPopup closePopup={() => setShowSignIn(false)} onSignInSuccess={handleSignInSuccess} />}
    </nav>
  );
}

export default Navbar;
