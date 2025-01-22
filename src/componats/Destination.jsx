import "./DestinationStyle.css";
import DestinationData from "./DestinationData";
import rabat1 from "../assets/hassan.jpg";
import rabat2 from "../assets/darih.jpg";
import kesh1 from "../assets/kesh1.jpg";
import kesh from "../assets/kesh.jpg";

const Destination = () => {
  return (
    <div className="destination">
      <h1>Explorez les villes du Maroc</h1>
      <p>
        Informez-vous davantage sur la ville que vous désirez visiter. Ne vous
        inquiétez pas, nous proposerons plus de villes prochainement.
      </p>
      <DestinationData
        className="first-des"
        heading="Rabat"
        text="Rabat est une ville culturelle chargée d'histoire. De nombreux chefs-d'œuvre et espaces verts décorent ses rues et ses places."
        img1={rabat1}
        img2={rabat2}
        btnClass="show"
        link="/location/Rabat"

      />
      <DestinationData
        className="first-des-reverse"
        heading="Marrakech"
        text="Dynamique et animée, Marrakech déborde d'une énergie qui lui est propre (ce n'est pas pour rien qu'elle est l'une des villes les plus visitées du Maroc).  "
        img1={kesh1}
        img2={kesh}
        btnClass="show"
        link="/location/Marrakesh"

      />
    </div>
  );
};
export default Destination;
