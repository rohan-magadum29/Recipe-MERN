
import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetRecipes } from "../services/service";
import InputField from "./InputField";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useGetRecipes(debouncedSearch);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="flex flex-col my-6 sm:my-8 mx-4 sm:mx-6 md:mx-10 lg:mx-16 gap-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">

        <span className="font-semibold text-2xl">
          My Recipes
        </span>

        <div className="flex flex-col xs:flex-row sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-64">
            <InputField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search / Filter Recipes"
            />
          </div>

          <button
            onClick={() => navigate("/recipe/create")}
            className="flex gap-2 items-center justify-center bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md text-white cursor-pointer w-full sm:w-auto shrink-0"
          >
            Create
            <HiOutlinePlus />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">

        {isLoading ? (
          <div className="col-span-full flex items-center justify-center min-h-[50vh]">
            Loading...
          </div>
        ) : Array.isArray(data?.data) && data.data.length ? (
          data.data.map((item) => (
            <RecipeCard key={item._id} recipeData={item} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center min-h-[50vh] text-gray-500">
            No Recipes Found
          </div>
        )}

      </div>
    </div>
  );
};

export default RecipeList;
