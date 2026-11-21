import { Button } from "@astryxdesign/core/Button";
import "./styles/Landing.css";
import { assetUrl } from "../utils/assetUrl";

// Background removed with rembg; colour grade is applied in Landing.css.
const PHOTO = assetUrl("images/zaid.webp");

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="hero-word" aria-hidden="true">
        PORTFOLIO
      </div>

      <div className="hero-photo">
        <img src={PHOTO} alt="Zaid Sohail" fetchPriority="high" />
      </div>

      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            ZAID
            <br />
            <span>SOHAIL.</span>
          </h1>
          <p className="hero-tagline">
            Backend & ML engineer who ships full products, from model to UI.
          </p>
          <div className="hero-actions">
            <Button
              label="Contact Me"
              variant="primary"
              size="lg"
              href="mailto:zaidsohail555@gmail.com"
            />
            <Button label="View Work" variant="secondary" size="lg" href="#work" />
          </div>
        </div>
        <div className="landing-info">
          <h3>A Full Stack</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Developer</div>
            <div className="landing-h2-2">Engineer</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Engineer</div>
            <div className="landing-h2-info-1">Developer</div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
