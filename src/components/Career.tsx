import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & Developer</h4>
                <h5>ValoraTrade (Independent Project)</h5>
              </div>
              <h3>Jan 2025 – Nov 2025</h3>
            </div>
            <p>
              Built and deployed a full-stack crypto trading signal platform
              using FastAPI, XGBoost, and React, hosted on Google Cloud Run.
              Identified an overfitting issue where the model was trained on
              upward-biased BTC price data, causing incorrect signals in
              downtrends. Removed the underperforming time-series component and
              retrained on engineered features to improve reliability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & Developer</h4>
                <h5>JARVIS (Open-Source Project)</h5>
              </div>
              <h3>Feb 2026 – Present</h3>
            </div>
            <p>
              Building a cross-platform AI assistant (Electron + React) that
              runs a local LLM through Ollama, with real-time voice
              input/output, wake-word detection, and live system monitoring.
              Actively maintained and open source; used the GitHub API directly
              to track down and fix bugs across memory handling, STT
              localization, and session summarization.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Developer</h4>
                <h5>UniConnect (Coursework Project)</h5>
              </div>
              <h3>May 2026 – Jun 2026</h3>
            </div>
            <p>
              Built a B2B LMS for Pakistani universities with live video
              conferencing, using React, Firebase, and WebRTC. Took it from a
              class assignment to a working product in about 15 days, including
              the business plan behind it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
