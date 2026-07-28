import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          CS student who builds full products instead of just coursework.
          Shipped a live crypto trading platform (FastAPI, XGBoost, React)
          deployed on GCP, and a desktop AI assistant running a local LLM with
          real-time voice. Backend is where I'm strongest, but I build the
          whole stack when the project needs it.
        </p>
      </div>
    </div>
  );
};

export default About;
