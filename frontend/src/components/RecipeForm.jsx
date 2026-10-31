
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateRecipe,
  useGetRecipesById,
  useUpdateRecipe,
  useUploadFile,
} from "../services/service";
import Dropdown from "./Dropdown";
import FileInput from "./FileInput";
import InputField from "./InputField";
import TextArea from "./TextArea";
import { HiOutlineArrowLeftEndOnRectangle } from "react-icons/hi2";

const RecipeForm = ({ isUpdate = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    mutate: createRecipe,
    data: createdata,
    isPending: isCreatingRecipe,
  } = useCreateRecipe();

  const {
    mutate: updateRecipe,
    data: updateData,
    isPending: isUpdatingRecipe,
  } = useUpdateRecipe(id);

  const { data: prefillData, isLoading: isLoadingPrefillData } =
    useGetRecipesById(id);

  const { mutateAsync: uploadFile, isPending: isUploadingImage } =
    useUploadFile();

  const [fileData, setFileData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    payload.ingredients = data.getAll("ingredients");

    !isUpdate
      ? createRecipe({
          ...payload,
          image: fileData?.image,
          imagePublicId: fileData?.imagePublicId,
        })
      : updateRecipe({
          ...payload,
          image: fileData?.image,
          imagePublicId: fileData?.imagePublicId,
        });
  };

  const response = createdata || updateData;

  useEffect(() => {
    setFileData({
      image: prefillData?.data?.image,
      imagePublicId: prefillData?.data?.imagePublicId,
    });
  }, [prefillData]);

  const sanitizedPrefillData = prefillData?.data || {};

  if (isLoadingPrefillData) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5 py-6 sm:py-8 px-4 sm:px-6 md:px-10 lg:px-16">

      <div className="flex items-center justify-between gap-3 w-full">
        <span className="font-semibold text-xl sm:text-2xl">
          {isUpdate ? "Update" : "Create"} Recipe
        </span>

        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex gap-1 items-center justify-center border border-gray-300 hover:bg-gray-100 px-3 sm:px-5 py-2 rounded-lg text-gray-700 shrink-0"
        >
          <HiOutlineArrowLeftEndOnRectangle className="size-4 text-gray-500" />
          Back
        </button>
      </div>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">

          <FileInput
            isUploading={isUploadingImage}
            fileData={fileData}
            name="image"
            setFileData={setFileData}
            uploadFile={uploadFile}
            className="col-span-full"
          />

          <InputField
            label="Title"
            name="title"
            defaultValue={sanitizedPrefillData?.title}
            required={true}
          />

          <InputField
            label="Cuisine"
            name="cuisine"
            defaultValue={sanitizedPrefillData?.cuisine}
          />

          <InputField
            label="Category"
            name="category"
            defaultValue={sanitizedPrefillData?.category}
          />

          <InputField
            label="Preparation Time (Minutes)"
            name="preparationTime"
            type="number"
            defaultValue={sanitizedPrefillData?.preparationTime}
          />

          <InputField
            label="Cooking Time (Minutes)"
            name="cookingTime"
            type="number"
            defaultValue={sanitizedPrefillData?.cookingTime}
          />

          <InputField
            label="Servings"
            name="servings"
            type="number"
            defaultValue={sanitizedPrefillData?.servings}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

          <TextArea
            label="Description"
            name="description"
            type="textArea"
            defaultValue={sanitizedPrefillData?.description}
            required={true}
          />

          <TextArea
            label="Cooking Instructions"
            name="cookingInstructions"
            defaultValue={sanitizedPrefillData?.cookingInstructions}
          />

          <Dropdown
            label="Ingredients"
            name="ingredients"
            defaultValue={sanitizedPrefillData?.ingredients}
            options={[
              "Onion",
              "Tomato",
              "Potato",
              "Garlic",
              "Ginger",
              "Green Chilli",
              "Capsicum",
              "Carrot",
              "Paneer",
              "Chicken",
            ]}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="w-full sm:w-auto flex items-center justify-center mt-2 py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
            disabled={
              isUploadingImage ||
              isCreatingRecipe ||
              isUpdatingRecipe
            }
          >
            Submit
          </button>
        </div>
      </form>

      {response?.message && (
        <span className="text-sm text-center sm:text-left">
          {response.message}
        </span>
      )}
    </div>
  );
};

export default RecipeForm;
