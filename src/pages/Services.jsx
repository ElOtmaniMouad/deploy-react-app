import ServicesImg from "../assets/chef.jpg";
import StAdmin from "../componats/SiteAdmin.jsx";

import '../componats/Hero.css';

function Services() {
  return (
    <>
      <div className="hero">
      <img src={ServicesImg} alt="Hero" />
      <div className="hero-text">
      <section className="pb-5 header text-center">
                <div className="container py-5 text-dark">
                    <header className="py-5">
                        <h1 className="display-4">Manage Tourist Sites</h1>
                        <p className="font-italic mb-1">Add, edit, or delete tourist sites.</p>
                    </header>
                </div>
            </section> 
        </div>
      </div> 
      <StAdmin />

    </>
  );
}
export default Services;
