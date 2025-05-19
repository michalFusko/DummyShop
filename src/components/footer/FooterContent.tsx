import HeroSvg from "../../../public/svg/HeroSvg";
import { CategoryGroupKey } from "../../types/category";
import { categoryGroups } from "../../utils/categoryGroups";
import { Link } from "react-router-dom";
import { services } from "../../utils/services";
import { GoPlus } from "react-icons/go";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const FooterContent = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailValue("");
  };

  const toggleSection = (name: string) => {
    setIsOpen((prev) => (prev === name ? null : name));
  };
  //CONTAINS BOTH DESKTOP AND MOBILE VERSION
  return (
    // DESKTOP ********************************
    <>
      <section
        aria-label="Footer"
        className="hidden h-[60vh] items-end justify-center overflow-hidden border-b bg-white p-5 text-black md:flex"
      >
        <div className="relative flex h-[50vh] w-full">
          {/* EXTENDING BORDER STYLES */}
          <div className="absolute top-0 right-5 h-full w-full border-r border-black"></div>
          <div className="absolute top-5 left-0 h-full w-full border-t border-black"></div>
          <div className="absolute top-0 left-5 h-full w-full border-l border-black"></div>
          <div className="absolute bottom-5 left-0 h-full w-full border-b border-black"></div>
          {/* CONTENT */}
          <div className="z-10 flex h-full w-full items-start justify-between p-10">
            {/* LEFT SIDE */}
            <div className="flex h-full w-1/2 flex-col justify-between">
              <div className="flex h-full items-center pl-[8%]">
                <HeroSvg />
              </div>
              <div className="text-sm">
                <p>[ GET 10% OFF ]</p>
                <p>SUBSCRIBE TO DUMMY SHOP.</p>
                <form
                  onSubmit={handleSubmit}
                  className="flex h-12 w-full border p-1 text-xs lg:w-[80%]"
                >
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="YOUR EMAIL ADRESS"
                    className="h-full w-[80%] pl-5 outline-none lg:pl-10"
                  />
                  <button
                    type="submit"
                    className="h-full w-[30%] cursor-pointer bg-black text-white lg:w-[40%]"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="z-10 flex w-5/7 justify-around pr-[5%] lg:w-1/2">
              {/* CATEGORIES */}
              <ul>
                <h1 className="mb-5 text-sm font-semibold lg:text-base">
                  CATEGORIES
                </h1>
                {Object.entries(categoryGroups).map(([category]) => (
                  <li key={category} className="relative mb-2 text-xs">
                    <motion.span
                      initial={{
                        color: "rgba(10, 10, 10, 0.7)",
                      }}
                      whileHover={{
                        color: "rgba(10, 10, 10, 1)",
                      }}
                      transition={{ duration: 0.1 }}
                    >
                      <Link
                        to={`/shop/${categoryGroups[category as CategoryGroupKey].join("+")}/1`}
                      >
                        {category.toUpperCase().replace("NS", "NS ")}
                      </Link>
                    </motion.span>
                  </li>
                ))}
              </ul>
              {/* CUSTOMER SERVICES */}
              <ul>
                <h1 className="mb-5 text-sm font-semibold lg:text-base">
                  CUSTOMER SERVICES
                </h1>
                {services.map((service) => (
                  <li key={service.id} className="mb-2 text-xs">
                    <motion.span
                      initial={{
                        color: "rgba(10, 10, 10, 0.7)",
                      }}
                      whileHover={{
                        color: "rgba(10, 10, 10, 1)",
                      }}
                      transition={{ duration: 0.1 }}
                    >
                      <Link to={service.path}>{service.name}</Link>
                    </motion.span>
                  </li>
                ))}
              </ul>
              {/* BRAND */}
              <ul>
                <h1 className="mb-5 text-sm font-semibold lg:text-base">
                  BRAND
                </h1>
                <li className="mb-2 text-xs">
                  <motion.span
                    initial={{
                      color: "rgba(10, 10, 10, 0.7)",
                    }}
                    whileHover={{
                      color: "rgba(10, 10, 10, 1)",
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    <Link to={"/about"}>ABOUT US</Link>
                  </motion.span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE ************************************** */}
      <section
        aria-label="Footer"
        className="flex flex-col border-b bg-white text-black md:hidden"
      >
        {/* TOP 1/2 */}
        <div className="flex min-h-[40vh] w-full flex-col items-center justify-around border-b p-5">
          <HeroSvg />
          <div className="w-full text-sm">
            <p>[ GET 10% OFF ]</p>
            <p>SUBSCRIBE TO DUMMY SHOP.</p>
            <form
              onSubmit={handleSubmit}
              className="flex h-12 w-full border p-1 text-xs lg:w-[80%]"
            >
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="YOUR EMAIL ADRESS"
                className="h-full w-[80%] pl-5 outline-none lg:pl-10"
              />
              <button
                type="submit"
                className="h-full w-[30%] cursor-pointer bg-black text-white lg:w-[40%]"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
        {/* BOTTOM 1/2 - EXPENDABLES */}
        <div className="w-full">
          {/* CATEGORIES */}
          <div className="flex flex-col items-start border-b bg-white">
            <button
              onClick={() => toggleSection("CATEGORIES")}
              className="flex h-full w-full cursor-pointer items-center justify-between p-4"
            >
              <h1 className="text-xs font-medium">CATEGORIES</h1>
              <GoPlus />
            </button>
            {/* CATEGORIES - EXPENDABLE */}
            <ul
              aria-haspopup={true}
              aria-expanded={isOpen === "CATEGORIES"}
              className={`${isOpen === "CATEGORIES" ? "" : "hidden"} flex flex-col pb-2 pl-6`}
            >
              {Object.entries(categoryGroups).map(([category]) => (
                <li key={category} className="mb-4 text-xs">
                  <Link
                    to={`/shop/${categoryGroups[category as CategoryGroupKey].join("+")}/1`}
                  >
                    {category.toUpperCase().replace("NS", "NS ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* CUSTOMER SERVICES */}
          <div className="flex flex-col items-start border-b bg-white">
            <button
              onClick={() => toggleSection("SERVICES")}
              className="flex w-full cursor-pointer items-center justify-between p-4"
            >
              <h1 className="text-xs font-medium">CUSTOMER SERVICES</h1>
              <GoPlus />
            </button>
            {/* CUSTOMER SERVICES - EXPENDALE */}
            <ul
              aria-haspopup={true}
              aria-expanded={isOpen === "SERVICES"}
              className={`${isOpen === "SERVICES" ? "" : "hidden"} flex flex-col pb-2 pl-6`}
            >
              {services.map((service) => (
                <li key={service.id} className="mb-4 text-xs">
                  <Link to={service.path}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col items-start border-b bg-white">
            <button
              onClick={() => toggleSection("ABOUT")}
              className="flex w-full cursor-pointer items-center justify-between p-4"
            >
              <h1 className="text-xs font-medium">BRAND</h1>
              <GoPlus />
            </button>
            {/* ABOUT - EXPENDABLE */}
            <ul
              aria-haspopup={true}
              aria-expanded={isOpen === "ABOUT"}
              className={`${isOpen === "ABOUT" ? "" : "hidden"} flex flex-col pb-2 pl-6`}
            >
              <li className="mb-4 text-xs">
                <Link to={"/about"}>ABOUT US</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterContent;
