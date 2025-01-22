import ContactImg from "../assets/kesh.jpg";
import ContactForm from "../componats/ContactForm.jsx";
import '../componats/Hero.css';

function Contact() {
  return (
    <>
      <div className="hero">
      <img src={ContactImg} alt="Hero" />
      <div className="hero-text">
          
        </div>
      </div>  
      <ContactForm />
    </>
  );
}
export default Contact;
