import React, { createRef, useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './PopupForm.css';
import axiosClient from '../axios-client'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import SignUpPopup from './SignUpPopup'; // Import your SignUpPopup component

import {useStateContext} from "../context/ContextProvider.jsx";


function SignInPopup({ closePopup, onSignInSuccess, onLogin }) {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { user, setUser, setToken } = useStateContext(); // Include user here

  const [showSignUp, setShowSignUp] = useState(false); // State to control SignUpPopup visibility
  const [message, setMessage] = useState(null); // Error message state
  const [errors, setErrors] = useState({}); // Local error state

  // useEffect(() => {
  //   // Close the popup if the user is already authenticated
  //   if (user) 

  //     setMessage(`Bonjour, utilisateur login is useless to you`);
    
  //     setTimeout(() => {
  //     closePopup();
  //   }, 1000);
  // }, [user, closePopup]);

  // Form submission handling
  const onSubmit = async (ev) => {
    ev.preventDefault();
    setMessage(null); // Clear previous message

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
        localStorage.setItem('ACCESS_TOKEN', data.token); // Stocke le token
        console.log('Login successful, token stored.');
        // Show welcome message with name and surname
        setMessage(`Bonjour, utilisateur ${data.user.name} ${data.user.prenom}`);
        
        // Close the popup and show message after a short delay
        setTimeout(() => {
          closePopup();
        }, 2000); // Optional: 2 seconds delay to display message
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
          console.error('Login failed:', error.response?.data || error.message);
        }
      })
  }

  if (user) return null; // If user is logged in, don't render the popup

  return (
    !user && (  // Show the popup only if the user is not logged in

    <Modal show={true} onHide={closePopup} centered>
      <Modal.Header closeButton>
        <Modal.Title>Se connecter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <div className="error-message">{message}</div>}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Entrez votre email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="Entrez votre mot de passe"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Se connecter
          </Button>
          <Button variant="secondary" onClick={closePopup}>Fermer</Button>
          <p className="message">
              Pas encore inscrit?{' '}
              <span onClick={() => setShowSignUp(true)} style={{ color: 'blue', cursor: 'pointer' }}>
                Créer un compte
              </span>
          </p>
           </Form>
      </Modal.Body>
    </Modal>
  )
);
}

export default SignInPopup;
