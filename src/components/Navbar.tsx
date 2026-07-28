import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import Lenis from "lenis";
import "./styles/Navbar.css";

export const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
});

const Navbar = () => {
  useEffect(() => {
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    lenis.stop();

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
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
        <a
          href="mailto:zaidsohail555@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
          style={{ textDecoration: 'none' }}
        >
          <button className="contact-btn">Contact Me</button>
        </a>
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
