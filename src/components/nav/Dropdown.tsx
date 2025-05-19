import { Dispatch, SetStateAction } from "react";
import { categoryGroups } from "../../utils/categoryGroups";
import { Link } from "react-router-dom";
import { CategoryGroupKey } from "../../types/category";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const Dropdown = ({
  handleMouseEnter,
  handleMouseLeave,
  isDropdownOpen,
  setIsDropdownOpen,
}: DropdownProps) => {
  return (
    <>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.section
            initial={{
              height: "1vh",
            }}
            animate={{
              height: "93vh",
            }}
            exit={{ height: "1vh" }}
            transition={{
              ease: "easeInOut",
              duration: 0.1,
            }}
            className={`fixed top-[7vh] z-10 flex h-[93vh] w-full overflow-y-auto text-sm outline outline-black xl:text-xl`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* CATEGORIES */}
            <ul className="h-full w-1/4 border-r bg-white pt-10 pl-10 text-black lg:pl-20">
              {Object.keys(categoryGroups).map((group) => (
                <motion.li
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  key={group}
                  className="relative mt-5 flex items-center justify-between"
                >
                  <Link
                    to={`shop/${categoryGroups[group as CategoryGroupKey].join("+")}/1`}
                    onClick={() => setIsDropdownOpen(false)}
                    className="relative"
                  >
                    <h1 className="border-b-2 border-transparent">
                      {group.toUpperCase().replace("NS", "NS ")}
                    </h1>

                    <motion.div
                      variants={{
                        rest: { width: 0, transition: { duration: 0 } },
                        hover: {
                          width: "100%",
                          transition: { duration: 0.3, ease: "circInOut" },
                        },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute bottom-0 left-0 h-[2px] bg-black"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
            {/* RIGHT SIDE - BACKGROUND/OVERLAY */}
            <img
              onClick={() => setIsDropdownOpen(false)}
              src="/images/dropdown.jpg"
              alt="Background"
              className="w-3/4 object-cover"
            />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dropdown;
