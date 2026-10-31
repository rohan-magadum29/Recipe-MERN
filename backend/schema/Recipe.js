import { model, Schema } from "mongoose";
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
    },
    category: {
      type: String,
    },
    preparationTime: {
      type: Number,
    },
    cookingTime: {
      type: Number,
    },
    servings: {
      type: Number,
    },
    ingredients: {
      type: [String],
    },
    cookingInstructions: {
      type: String,
    },
    image: {
      type: String,
    },
    imagePublicId: String,
  },
  {
    timestamps: true,
  },
);

export default model("Recipe", recipeSchema);
