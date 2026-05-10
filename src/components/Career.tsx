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
                <h4>Frontend Development Intern</h4>
                <h5>Buzzware Tech</h5>
              </div>
              <h3>Aug 2024 – Sep 2024</h3>
            </div>
            <p>
              Built responsive, user-friendly websites leveraging HTML5, CSS3, JavaScript, and React.
              Translated UI/UX wireframes into functional, pixel-perfect web components.
              Optimized site performance using code structure improvements, image compression, and lazy loading.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cyber Security Professional (Junior Level)</h4>
                <h5>Hazza Institute of Technology</h5>
              </div>
              <h3>Apr 2025 – Jul 2025</h3>
            </div>
            <p>
              Monitored and analyzed security events using SIEM tools (Splunk, QRadar).
              Supported penetration testing on web apps and networks, identifying and reporting vulnerabilities.
              Conducted vulnerability scans using Nessus, OpenVAS, and Burp Suite.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer & Automation Engineer</h4>
                <h5>Freelance / Independent Projects</h5>
              </div>
              <h3>2024 – Present</h3>
            </div>
            <p>
              Designed and deployed production-grade full stack web applications including coldnerd.com and a solar energy platform.
              Built cross-platform React Native apps and Shopify e-commerce storefronts.
              Engineered autonomous Instagram lead generation and DM automation tools.
              Designed end-to-end workflow automations using n8n, Make.com, and Zapier, integrating AI models (OpenAI, Gemini, Anthropic).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
