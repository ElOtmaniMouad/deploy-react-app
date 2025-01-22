import "./DestinationStyle.css";
import { useNavigate } from 'react-router-dom';

const DestinationData = ({ className, heading, text, img1, img2, btnClass, link }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(link);
  };

  return (
    <div className={className}>
      <div className="des-text">
        <h2>{heading}</h2>
        <p>{text}</p>
        <button className={btnClass} onClick={handleNavigation}>
          En Savoir Plus
        </button>
      </div>
      <div className="image">
        <img alt="img" src={img1} />
        <img alt="img" src={img2} />
      </div>
    </div>
  );
};

export default DestinationData;
