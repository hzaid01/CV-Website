import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { lenis } from "./utils/lenis";
import { Button } from "@astryxdesign/core/Button";
import "./styles/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    let id = 0;
    function raf(time: number) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);

    lenis.stop();

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          if (section) {
            lenis.scrollTo(section, { offset: 0 });
          }
        }
      });
    });

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <span className="nav-logo">Zaid</span>
        </a>
        <span className="navbar-connect" data-cursor="disable">
          <Button label="Contact Me" variant="primary" size="sm" href="mailto:zaidsohail555@gmail.com" />
        </span>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
