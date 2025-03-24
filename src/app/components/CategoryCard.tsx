import React from "react";

interface Category {
  id: string;
  name: string;
  iconUrl: string;
  isNew: boolean;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full mb-4">
      <div className="relative w-full aspect-square">
        <img
          src={category.iconUrl}
          alt={category.name}
          className="w-full h-full object-cover rounded-lg"
        />
        {category.isNew && (
          <span
            style={{
              background: "linear-gradient(90deg, #3C53E8 0%, #7DB3F6 100%)",
            }}
            className="flex w-full px-2 py-1 justify-center items-center gap-1 absolute bottom-0 rounded-b-lg"
          >
            <img
              src="img/CategoryCard/SoftStar.svg"
              alt=""
              className="w-5 h-5"
            />
            Новое
          </span>
        )}
      </div>
      <div className="flex justify-center items-center max-w-[22.14vw]">
        <p className="text-[#EFEDF6] text-[4vw] text-center w-full break-words whitespace-normal">
          {category.name}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
