import { GoPlus } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";

interface ProductExpandableProps {
  isOpen: boolean;
  setIsOpen: () => void;
  name: string;
  children: React.ReactNode;
}
const ProductExpandable = ({
  isOpen,
  setIsOpen,
  name,
  children,
}: ProductExpandableProps) => {
  return (
    <section>
      <div
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={`${name}-content`}
        className="flex h-10 cursor-pointer items-center justify-between bg-white px-2 text-xs outline md:mt-5"
        onClick={setIsOpen}
      >
        <h1>{name}</h1>
        <GoPlus size={15} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: "0" }}
            animate={{ height: "auto" }}
            exit={{ height: "0" }}
            transition={{ duration: 0.2 }}
            id={`${name}-content`}
            role="dialog"
            className={`ml-2 overflow-hidden pt-2 text-xs lg:ml-8`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductExpandable;
