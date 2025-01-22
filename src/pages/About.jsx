import AboutImg from "../assets/night.jpg";
import AboutUs from "../componats/AboutUs.jsx";
import '../componats/Hero.css';

function About() {
  return (
    <>
<div className="hero">
      <img src={AboutImg} alt="Hero" />
      <div className="hero-text">
          
        </div>
      </div>  

          <AboutUs />
    </>
  );
}
export default About;

