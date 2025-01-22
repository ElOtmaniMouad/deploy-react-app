import React, { useEffect, useState } from "react";
import axiosClient from '../axios-client';
import { useParams } from "react-router-dom";
import './siteDetails.css';
import { useStateContext } from "../context/ContextProvider.jsx";

function SiteDetails() {
  const { siteId } = useParams(); // Récupérer l'ID du site depuis l'URL
  const [site, setSite] = useState(null); // Détails du site
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [rating, setRating] = useState(0); // Note donnée par l'utilisateur
  const [comments, setComments] = useState([]); // Liste des commentaires
  const [newComment, setNewComment] = useState(""); // Nouveau commentaire
  const { user, setUser } = useStateContext(); // Contexte utilisateur

  useEffect(() => {
    // Charger les détails du site
    axiosClient
      .get(`http://localhost:8000/api/tourist-sites/${siteId}`)
      .then((response) => {
        setSite(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails du site :", error);
        setLoading(false);
      });

    // Charger les commentaires existants pour ce site
    axiosClient
      .get(`http://localhost:8000/api/tourist-sites/${siteId}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des commentaires :", error)
      );

    // Charger les informations de l'utilisateur
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      axiosClient
        .get("/user")
        .then(({ data }) => setUser(data))
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log("Utilisateur non authentifié");
            setUser(null);
          } else {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
          }
        });
    } else {
      console.log("Aucun token trouvé");
      setUser(null);
    }
  }, [siteId]);

  // Gestion de la soumission de la note
  const handleRatingChange = (newRating) => {
    if (!user || !user.id) {
      console.error("Utilisateur non connecté");
      return;
    }

    setRating(newRating);
    axiosClient
      .post(`http://localhost:8000/api/tourist-sites/${siteId}/rating`, {
        user_id: user.id,
        rating: newRating,
      })
      .then(() => console.log("Note soumise avec succès"))
      .catch((error) =>
        console.error("Erreur lors de la soumission de la note :", error)
      );
  };

  // Gestion de la soumission d'un commentaire
  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!user || !user.id) {
      console.error("Utilisateur non connecté");
      return;
    }

    if (newComment.trim() !== "") {
      axiosClient
        .post(`http://localhost:8000/api/tourist-sites/${siteId}/comment`, {
          user_id: user.id,
          comment: newComment.trim(),
        })
        .then((response) => {
          console.log(response.data); // Inspectez la structure de la réponse

          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch((error) =>
          console.error("Erreur lors de la soumission du commentaire :", error)
        );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!site) return <p>Site not found.</p>;

  return (
    <div className="site-details">
      {/* Image du site */}
      <img
        src={`http://localhost:8000/${site.image_url}`}
        alt={site.name}
        className="site-image"
      />
      <h1>{site.name}</h1>
      <p>{site.description}</p>
      <p>Location: {site.location}</p>
      <p>Category: {site.category}</p>

      {/* Section des notes */}
      <div className="rating-section">
        <h2>Rating</h2>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingChange(star)}
            style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
          >
            ★
          </span>
        ))}
      </div>

      <div className="comments-section">
  <h2>Comments</h2>
  {comments.map((comment, index) => (
    <div key={index} className="comment">
      {/* Assurez-vous que comment.comment est une chaîne */}
      <p>{typeof comment.comment === "string" ? comment.comment : "Invalid comment"}</p>
      <small>{new Date(comment.created_at).toLocaleString()}</small>
    </div>
  ))}
  {user ? (
    <form onSubmit={handleCommentSubmit} className="comment-form">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        required
      />
      <button type="submit">Submit</button>
    </form>
  ) : (
    <p>Please log in to add a comment.</p>
  )}
  
      </div>

      </div>
  );
}

export default SiteDetails;
