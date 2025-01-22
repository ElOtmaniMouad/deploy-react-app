import React, { createRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import './PopupForm.css';
import SignInPopup from './SignInPopup'; // Import SignInPopup component
import axiosClient from '../axios-client';
import { useStateContext } from "../context/ContextProvider.jsx";

function SignUpPopup({ closePopup }) {
  const nameRef = createRef();
  const prenomRef = createRef();
  const dateNaissanceRef = createRef();
  const telephoneRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  
  const { user, setUser, setToken } = useStateContext(); // Include user here
  const [errors, setErrors] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false); // State to control SignInPopup visibility

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      prenom: prenomRef.current.value,
      dateNaissance: dateNaissanceRef.current.value,
      telephone: telephoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user);
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
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  // if (user)  {
  //   console.log('User is authenticated');
  // }; 

  // if (!user)  {
  //   console.log('User is not authenticated');
  // }; 

  return (
    <>
      <Modal show={true} onHide={closePopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <h1 className="title">Signup for Free</h1>
            {errors && (
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control ref={nameRef} type="text" placeholder="Entrez votre nom" />
            </Form.Group>

            <Form.Group controlId="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control ref={prenomRef} type="text" placeholder="Entrez votre prénom" />
            </Form.Group>

            <Form.Group controlId="dateNaissance">
              <Form.Label>Date de naissance</Form.Label>
              <Form.Control ref={dateNaissanceRef} type="date" />
            </Form.Group>

            <Form.Group controlId="telephone">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control ref={telephoneRef} type="tel" placeholder="Entrez votre téléphone" />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="Entrez votre email" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="Entrez votre mot de passe" />
            </Form.Group>

            <Form.Group controlId="password_confirmation">
              <Form.Label>Confirmez le mot de passe</Form.Label>
              <Form.Control ref={passwordConfirmationRef} type="password" placeholder="Confirmez votre mot de passe" />
            </Form.Group>

            <Button variant="primary" type="submit">
              S'inscrire
            </Button>
            <Button variant="secondary" onClick={closePopup}>Fermer</Button>
            <p className="message">
              Déjà inscrit?{' '}
              <span onClick={() => setShowSignIn(true)} style={{ color: 'blue', cursor: 'pointer' }}>
                Se connecter
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>

      {showSignIn && <SignInPopup closePopup={() => setShowSignIn(false)} />} {/* Open SignInPopup */}
    </>
  );
}

export default SignUpPopup;
