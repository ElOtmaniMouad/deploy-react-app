// Trip.js
import React from "react";
import "./TripStyle.css";
import TripData from "./TripData";
import Sport from "../assets/Sport.jpeg";
import Shopping from "../assets/Mall.jpeg";
import Plage from "../assets/Plage.jpg";
import Monument from "../assets/Monument.jpeg";

function Trip() {
  return (
    <div className="trip">
      <h1>Quelles activités faire pendant mon voyage ?</h1>
      <div className="tripCard">
        <TripData
          image={Sport}
          heading="Sport"
          text="Vivez des aventures sportives, du trekking aux sports nautiques."
          link="/category/sport"
        />
        <TripData
          image={Shopping}
          heading="Malls & Grandes Surfaces"
          text="Faites du shopping dans des centres commerciaux modernes."
          link="/category/mall"
        />
        <TripData
          image={Plage}
          heading="Plages"
          text="Profitez de plages idylliques pour vous détendre."
          link="/category/plage"
        />
        <TripData
          image={Monument}
          heading="Monuments Historiques"
          text="Découvrez des monuments riches en histoire et en culture."
          link="/category/monument"
        />
      </div>
    </div>
  );
}

export default Trip;
