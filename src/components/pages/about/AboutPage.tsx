import ZustandSvg from "../../svg/ZustandSvg";
import ViteSvg from "../../svg/ViteSvg";
import ReactSvg from "../../svg/ReactSvg";
import ReactQuerySvg from "../../svg/ReactQuerySvg";
import ReactRouterSvg from "../../svg/ReactRouterSvg";
import TailwindSvg from "../../svg/TailwindSvg";
import FramerMotionSvg from "../../svg/FramerMotionSvg";
import TypeScriptSvg from "../../svg/TypeScriptSvg";
import { useState } from "react";
import AboutSection from "./AboutSection";
import MapEmbed from "./MapEmbed";
import { IoLocationSharp } from "react-icons/io5";
import CardContainer from "./CardContainer";
import { technologies } from "../../../utils/technologies";
import { FaLinkedin, FaStrava } from "react-icons/fa";

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState("BUILD");
  const [about, setAbout] = useState("PROJECT");

  return (
    <section className="mt-[7vh] h-full min-h-[100vh] bg-white">
      {/* about project/me navigation */}
      <header className="flex justify-center overflow-hidden pt-[5vh]">
        <nav className="flex p-1">
          <button
            className={`${about === "ME" ? "bg-seashell" : "border border-black/10"} z-10 w-[50vw] cursor-pointer rounded-sm p-2 text-xs shadow-sm sm:w-[40vw] sm:text-sm md:w-[30vw] md:text-base`}
            onClick={() => setAbout("PROJECT")}
          >
            ABOUT PROJECT
          </button>
          <button
            className={`${about === "PROJECT" ? "bg-seashell" : "border border-black/10"} z-10 w-[50vw] cursor-pointer rounded-sm p-2 text-xs shadow-sm sm:w-[40vw] sm:text-sm md:w-[30vw] md:text-base`}
            onClick={() => setAbout("ME")}
          >
            ABOUT ME
          </button>
        </nav>
      </header>
      {/* ABOUT PROJECT *******************************************************************/}
      {about === "PROJECT" && (
        <section className="flex w-full flex-col-reverse pt-10 md:flex-row-reverse">
          <main className="my-20 flex w-full flex-col items-center gap-5 xl:mr-10">
            <ul className="flex w-full justify-between sm:w-[70%] md:w-[90%] lg:w-[70%]">
              {/* SECTION SELECTOR */}
              {technologies.map(({ name }) => (
                <li
                  className={`${activeSection === name ? "bg-white" : "bg-seashell"} w-full cursor-pointer py-2 text-center text-xs outline lg:text-sm 2xl:text-base`}
                  onClick={() => setActiveSection(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
            {/* DYNAMIC DESCRIPTION */}
            {technologies.map(({ id, name, title, p1, p2 }) =>
              activeSection === name ? (
                <AboutSection key={id} title={title} p1={p1} p2={p2} />
              ) : null,
            )}
          </main>
          {/* TECHNOLOGIES CARDS */}
          <aside className="flex justify-center text-center">
            {activeSection === "BUILD" && (
              <CardContainer customClassName="build-shadow">
                <h1 className="flex justify-center gap-2 font-bold md:text-xl lg:text-2xl">
                  <span className="text-[#646CFF]">VITE</span>
                  <span className="text-black/30">&</span>
                  <span className="text-[#61DAFB]">REACT</span>
                </h1>
                <div className="flex justify-around">
                  <ViteSvg />
                  <ReactSvg />
                </div>
              </CardContainer>
            )}
            {activeSection === "TYPES" && (
              <CardContainer customClassName="types-shadow">
                <h1 className="flex justify-center gap-2 font-bold md:text-xl lg:text-2xl">
                  <span className="text-[#3178C6]">TYPESCRIPT</span>
                </h1>
                <div className="flex justify-around">
                  <TypeScriptSvg />
                </div>
              </CardContainer>
            )}
            {activeSection === "STYLES" && (
              <CardContainer customClassName="styles-shadow">
                <h1 className="flex flex-col justify-center gap-0 font-bold sm:p-0 md:text-xl lg:text-2xl 2xl:flex-row 2xl:gap-2">
                  <span className="text-sky-400">TAILWIND</span>
                  <span className="text-black/30">&</span>
                  <span className="text-purple-700">FRAMER MOTION</span>
                </h1>
                <div className="flex justify-around">
                  <TailwindSvg />
                  <FramerMotionSvg />
                </div>
              </CardContainer>
            )}
            {activeSection === "ROUTING" && (
              <CardContainer customClassName="routing-data-shadow">
                <h1 className="flex justify-center gap-2 font-bold md:text-xl lg:text-2xl">
                  <span className="text-black">REACT ROUTER</span>
                </h1>
                <div className="flex justify-around">
                  <ReactRouterSvg />
                </div>
              </CardContainer>
            )}
            {activeSection === "DATA" && (
              <CardContainer customClassName="routing-data-shadow">
                <h1 className="flex justify-center gap-2 font-bold md:text-xl lg:text-2xl">
                  <span className="text-black">REACT QUERY</span>
                </h1>
                <div className="flex justify-around">
                  <ReactQuerySvg />
                </div>
              </CardContainer>
            )}
            {activeSection === "STATE" && (
              <CardContainer customClassName="zustand-shadow">
                <h1 className="flex justify-center gap-2 font-bold md:text-xl lg:text-2xl">
                  <span className="text-[#FF9153]">ZUSTAND</span>
                </h1>
                <div className="flex justify-around">
                  <ZustandSvg />
                </div>
              </CardContainer>
            )}
          </aside>
        </section>
      )}
      {/* ABOUT ME ***********************/}
      {about === "ME" && (
        <section className="flex pt-10 lg:flex-row-reverse">
          <main className="flex w-full flex-col items-center gap-5 pr-10">
            {/* PHOTO AND NAME */}
            <header className="flex w-full flex-col-reverse items-center gap-5 sm:flex-row sm:gap-0 sm:px-30 md:justify-around">
              <h1 className="text-3xl font-medium md:text-4xl">MICHAL FUSKO</h1>
              <div className="h-[30vh] w-[30vh] overflow-hidden rounded-sm border border-black/20 shadow-md">
                <img
                  src="/images/about/profile-picture.jpg"
                  alt="My picture"
                  className="h-full scale-125 object-cover"
                />
              </div>
            </header>
            {/* LOCATION ON MOBILE */}
            <div className="flex w-full items-center gap-5 px-5 text-xl sm:px-10 lg:hidden lg:px-0">
              <IoLocationSharp />
              <span>BRNO</span>
            </div>
            {/* ABOUT ME */}
            <section className="flex flex-col px-5 sm:px-10 lg:px-0">
              <h2 className="text-xl font-medium">FRONT-END DEVELOPER</h2>
              <ul className="flex list-disc flex-col gap-2 pt-10 pl-6 text-xs sm:pl-10 lg:text-sm">
                <li>
                  <p>
                    I first started coding at the start of 2024, with no prior
                    experience. I bought a few online courses, but didn’t really
                    enjoy them, and eventually ended up stuck in “tutorial
                    hell.”
                  </p>
                  <p>
                    This year I fully committed to coding, and it’s been pretty
                    fun since.
                  </p>
                </li>
                <li>
                  <p>
                    My current stack includes all the technologies listed in the
                    “ABOUT PROJECT” section. I wouldn’t mind learning new ones.
                    It’s always been fun learning something new and getting
                    better at it.
                  </p>
                </li>
                <li>
                  <p>
                    Right now, I’m focused on becoming a stronger front-end
                    developer, ideally in a work environment with someone
                    experienced I can learn from. Later I’d like to dive into
                    backend too, just to get a full picture of how everything
                    fits together — and who knows, maybe it’ll turn out to be my
                    thing in the (back)end.
                    <span className="text-[10px]">haha</span>
                  </p>
                </li>
                <li>
                  <p>
                    I’m looking for a full-time position. If I could choose, I
                    would rather go to the office to meet with my colleagues in
                    person — but I’m totally fine with remote work too.
                  </p>
                  <p>
                    Other than that, I don’t really mind anything — I just want
                    to work with good people, get good work done and get better
                    at it.
                  </p>
                </li>
              </ul>
              {/* CONTACTS AND LINKS */}
              <div className="my-10 flex flex-col-reverse items-center justify-center gap-10 text-xs sm:flex-row sm:text-base">
                <span>+420 605 029 680</span>
                <span>m.fusko28@gmail.com</span>
                <div className="flex gap-10">
                  <a
                    href="https://www.linkedin.com/in/michal-fusko-2ab900367/"
                    target="_blank"
                  >
                    <FaLinkedin size={30} className="text-[#0A66C2]" />
                  </a>
                  <a
                    href="https://www.strava.com/athletes/161074946"
                    target="_blank"
                  >
                    <FaStrava size={30} className="text-orange-500" />
                  </a>
                </div>
              </div>
            </section>
          </main>
          {/* LOCATION DESKTOP */}
          <aside className="hidden lg:block">
            <div className="zustand-shadow m-20 w-[350px] rounded-sm border-black/10 xl:w-[450px]">
              <MapEmbed />
            </div>
          </aside>
        </section>
      )}
    </section>
  );
};

export default AboutPage;
