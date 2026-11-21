import { useEffect } from "react";
import BuildIntro from "./BuildIntro";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import {
  Craft,
  Journey,
  Results,
  StackStrip,
  Story,
  Together,
  Works,
} from "./Sections";

const MainContainer = () => {
  useEffect(() => {
    import("./utils/initialFX").then((module) => module.initialFX());
  }, []);

  return (
    <div className="container-main">
      <BuildIntro />
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div className="container-main">
        <Landing />
        <Works />
        <StackStrip />
        <Results />
        <Story />
        <Craft />
        <Journey />
        <Together />
      </div>
    </div>
  );
};

export default MainContainer;
