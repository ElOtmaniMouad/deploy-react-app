import Destination from "../componats/Destination.jsx";
import Trip from "../componats/Trip.jsx";
import { Link } from 'react-router-dom';
import HomeImg from "../assets/hhoma.jpg";
import '../componats/Hero.css';

export default function Home() {
    return <>
      <div className="hero">
      <img src={HomeImg} alt="Hero" />
      <div className="hero-text">
          <h1>Vous voyagez, nous planifions</h1>
          <p>Planifiez votre voyage en un click</p>
          <Link to="/preferences" className="show">Voyager</Link>
        </div>
      </div>

      <Destination />

      <Trip />
    </>
  }