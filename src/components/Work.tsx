import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "ColdNerd",
    category: "Full Stack Web Application",
    tools: "React, Node.js, Full Stack Architecture",
    image: "/images/project1.jpg",
    link: "https://coldnerd.com",
    year: "2024",
  },
  {
    title: "OPBC Investor Community",
    category: "Cross-Platform Mobile App",
    tools: "React Native, Supabase, Android/iOS/Web",
    image: "/images/project2.jpg",
    link: "https://opbc.vercel.app",
    year: "2025",
  },
  {
    title: "Instagram Lead Gen & DM Automation",
    category: "AI-Powered Automation Tool",
    tools: "Python, Playwright, OpenCV2, BeautifulSoup, PyAutoGUI",
    image: "/images/project3.jpg",
    year: "2025",
  },
  {
    title: "Solar Energy Crown",
    category: "Full Stack Business Platform",
    tools: "React, Firebase, Netlify",
    image: "/images/project4.jpg",
    link: "https://solarenergycrown.netlify.app",
    year: "2024",
  },
  {
    title: "Solid Starters",
    category: "Low-Code Platform",
    tools: "Angular, Next.js, NestJS, MongoDB",
    image: "/images/Solidx.png",
    year: "2023",
  },
  {
    title: "Radix",
    category: "E-Commerce",
    tools: "Angular, Next.js, NestJS, CMS",
    image: "/images/radix.png",
    year: "2023",
  },
  {
    title: "Bond Cancellation",
    category: "Import-Export Automation",
    tools: "Angular, Next.js, NestJS, Workflows",
    image: "/images/bond.png",
    year: "2023",
  },
  {
    title: "Sapphire",
    category: "CRM Platform",
    tools: "AngularJS, NestJS, PostgreSQL",
    image: "/images/sapphire.png",
    year: "2022",
  },
  {
    title: "Mpro",
    category: "Insurance Platform",
    tools: "React.js, Node.js, Microservices",
    image: "/images/Maxlife.png",
    year: "2021",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                        <span className="carousel-year">{project.year}</span>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link"
                            data-cursor="disable"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
