import { useNavigate } from "react-router-dom";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { useDeleteRecipe } from "../services/service";
const RecipeCard = ({ recipeData }) => {
  const { mutate: deleteRecipe } = useDeleteRecipe();
  const navigate = useNavigate();
  return (
    <div className="group relative flex flex-col gap-4 border border-gray-200 p-4 rounded-md hover:shadow-lg">
      <button
        className="cursor-pointer opacity-0 group-hover:opacity-100 absolute -right-2 -top-2 rounded-lg bg-red-100 p-1"
        onClick={() => {
          const isConfirmed = window.confirm(
            "Are you sure you want to delete this recipe?",
          );

          if (isConfirmed) {
            deleteRecipe(recipeData?._id);
          }
        }}
      >
        <HiOutlineTrash className="text-red-500 hover:text-red-600 size-5" />
      </button>
      <img
        src={recipeData?.image}
        alt="Recipe Cover Image"
        className="w-full h-48 rounded-md object-cover"
      />
      <div>
        <span className="text-gray-700 text-lg font-bold">
          {recipeData?.title}
        </span>
        <p className="text-gray-600 text-xs overflow-wrap">
          {recipeData?.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-auto text-sm font-medium">
        <button
          className="flex justify-center gap-2 items-center cursor-pointer text-white bg-orange-500 hover:bg-orange-600  p-2 rounded-md"
          onClick={() => {
            navigate(`/recipe/update/${recipeData?._id}`);
          }}
        >
          <span>Update</span>
          <HiOutlinePencilSquare className="size-4" />
        </button>
        <button
          className="flex justify-center gap-2 items-center cursor-pointer text-white bg-orange-500 hover:bg-orange-600 p-2 rounded-md"
          onClick={() => {
            navigate(`/recipe/${recipeData?._id}`);
          }}
        >
          <span>View Recipe</span>
          <HiOutlineArrowRightStartOnRectangle className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
