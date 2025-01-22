import Trip from "./Trip";
import { Link } from "react-router-dom";

import "./TripStyle.css";
import "./Hero.css";

function TripData(props) {
  return (
    <div className="t-card">
      <div className="t-image">
        <img src={props.image} alt="image" />
      </div>
      <h4>{props.heading}</h4>

      <p>{props.text}</p>
      <Link to={props.link} className="trip-link">Learn More</Link>
    </div>
  );
}
export default TripData;
