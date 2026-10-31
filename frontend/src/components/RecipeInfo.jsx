
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRecipesById } from "../services/service";
import { HiOutlineArrowLeftEndOnRectangle } from "react-icons/hi2";

const RecipeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetRecipesById(id);
  const recipe = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-500">Loading recipe...</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Recipe Details
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex gap-1 items-center justify-center border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-lg text-gray-700"
        >

          <HiOutlineArrowLeftEndOnRectangle className="size-4 text-gray-500"/>
          Back
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {recipe?.image && (
          <div className="w-full h-87.5 bg-gray-100">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {recipe.title}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {recipe.cuisine && (
              <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
                Cuisine: {recipe.cuisine}
              </span>
            )}

            {recipe.category && (
              <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
                Category: {recipe.category}
              </span>
            )}
          </div>

          <hr className="border-gray-200 mb-6" />

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Cooking Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">
                Preparation Time
              </p>
              <p className="text-xl font-semibold text-gray-800">
                {recipe.preparationTime ?? 0} mins
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">
                Cooking Time
              </p>
              <p className="text-xl font-semibold text-gray-800">
                {recipe.cookingTime ?? 0} mins
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">
                Servings
              </p>
              <p className="text-xl font-semibold text-gray-800">
                {recipe.servings ?? 0} People
              </p>
            </div>

          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Ingredients
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recipe.ingredients?.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    <span className="text-gray-700">
                      {ingredient}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No ingredients added.
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Cooking Instructions
            </h3>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="text-gray-700 leading-7 whitespace-pre-line">
                {recipe.cookingInstructions ||
                  "No cooking instructions available."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
