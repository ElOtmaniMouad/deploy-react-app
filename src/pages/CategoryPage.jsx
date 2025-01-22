import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './categorystyle.css';
import '../componats/Hero.css';
import ContactImg from "../assets/tanger.jpg";

function CategoryPage() {
  const { category } = useParams(); // Extracts the category parameter from the URL
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the tourist sites for the specified category
    axios
      .get(`http://localhost:8000/api/tourist-sites/category/${category}`)
      .then((response) => {
        setSites(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="category-page">
      <div className="hero">
        <img src={ContactImg} alt="Hero" />
        <div className="hero-text">
          <h2>Sites in {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        </div>
      </div>
      
      {/* Category Listings */}
      <div className="articles">
        {sites.map((site) => (
          <article key={site.id}>
            <figure>
              <img src={`http://localhost:8000/${site.image_url}`} alt={site.name} />
            </figure>
            <div className="article-body">
              <h2>{site.name}</h2>
              <p>{site.description}</p>
              <p>Location: {site.location}</p>
              {/* Link to SiteDetails page with the specific site ID */}
              <Link to={`/site-details/${site.id}`} className="trip-link">
                      Learn More <span className="icon">➔</span>
                </Link>

            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
