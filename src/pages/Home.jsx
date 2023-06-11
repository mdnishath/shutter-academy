import React, { useEffect } from "react";
import Container from "../components/shared/Container";
import Slider from "./components/Home/Slider";
import Title from "../components/shared/Title";
import PopularClasses from "./components/Home/PopularClasses";
import PopularInstructors from "./components/Home/PopularInstructors";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      const extraSection = document.getElementById("extra-section");
      if (extraSection) {
        const { top } = extraSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (top < windowHeight) {
          controls.start({ opacity: 1, y: 0 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);
  return (
    <div>
      {/* Slider  */}
      <Slider />
      {/* Slider  */}
      {/* Popular Classes */}
      <Container>
        <div className="py-10">
          <div className="text-center my-7">
            <Title text={"Popular Classes"} />
          </div>
          <PopularClasses />
        </div>
      </Container>
      {/* Popular Classes */}
      {/* Popular Instructores */}
      <Container>
        <div className="py-10">
          <div className="text-center my-7">
            <Title text={"Popular Instructors"} />
          </div>
          <PopularInstructors />
        </div>
      </Container>
      {/* Popular Instructores */}
      <div className="bg-gray-200 dark:bg-gray-700">
        <Container>
          <section id="extra-section" className="py-12 ">
            <div className="flex flex-col items-center justify-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={controls}
                transition={{ duration: 0.5 }}
                className="mb-4 text-4xl font-bold dark:text-textLight text-dark"
              >
                Discover the Beauty of Photography
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 text-lg dark:text-textLight text-dark"
              >
                Join our photography courses and unlock your creative potential.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  to="/#"
                  className="btn bg-primary text-textDark hover:bg-primary"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
};

export default Home;
