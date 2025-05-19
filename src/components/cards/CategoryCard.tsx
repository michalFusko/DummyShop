import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { categoryGroups } from "../../utils/categoryGroups";

interface CategoryCardProps {
  name: string;
  id: number;
  placeholder: string;
  src: string;
}

const CategoryCard = ({ id, placeholder, name, src }: CategoryCardProps) => {
  //link navigation handling
  const categoryGroupKey = (name: string) => {
    if (name === "Fashion") return "WomensFashion"; // categoryGroups.ts key
    if (name === "Home") return name; // categoryGroups.ts key
    return undefined; // "more" card navigates to shop without selected group
  };
  const key = categoryGroupKey(name);
  const group = key ? categoryGroups[key].join("+") : "";

  return (
    <div
      //cards touch each other so borders dont overlap
      aria-label="Category"
      className={`relative min-w-2/3 text-white md:min-w-1/3 ${id % 2 !== 0 ? "border-x border-black" : ""}`}
    >
      <div className="absolute bottom-20 left-10">
        <p
          className="mb-5 text-4xl lg:text-5xl 2xl:text-6xl"
          style={{ textShadow: "1px 2px 3px black" }}
        >
          {name.toLocaleUpperCase()}
        </p>
        <Link
          to={`/shop/${group} `}
          className="inline-flex items-center gap-2 bg-black p-2 lg:gap-5 lg:p-5 2xl:gap-10"
        >
          <span>SHOP NOW</span>
          <GoArrowRight size={20} />
        </Link>
      </div>
      <img
        src={src}
        alt={placeholder}
        className="h-full w-full object-cover p-5"
      />
    </div>
  );
};

export default CategoryCard;
