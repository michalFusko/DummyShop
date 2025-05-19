import { featuredCategories } from "../../../utils/featuredCategories";
import CategoryCard from "../../cards/CategoryCard";

const Categories = () => {
  return (
    <section
      aria-label="Featured Categories"
      className="relative h-[100vh] md:h-[93vh]"
    >
      <div className="absolute flex h-[100vh] w-full items-center bg-white md:h-[93vh]">
        <div className="scrollbar-hidden flex h-[90%] w-full justify-around overflow-x-auto border-y border-black bg-white px-0 md:px-10">
          {featuredCategories.map((item) => (
            <CategoryCard
              key={item.id}
              id={item.id}
              placeholder={item.placeholder}
              name={item.name}
              src={item.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
