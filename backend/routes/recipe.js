import { Router } from "express";
import Recipe from "../schema/Recipe.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const searchValue = req.query.search;
    console.log({ searchValue });
    const recipes = await Recipe.find({
      title: {
        $regex: searchValue || "",
        $options: "i",
      },
    }).sort({
      updatedAt: -1,
    });
    res.json({
      message: "Recipes Fetched Successfully",
      data: recipes,
    });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        message: "Recipe Not Found",
      });
    }
    res.json({
      data: recipe,
      message: "Recipe Fetched Successfully",
    });
  } catch (e) {
    next(e);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      description,
      cuisine,
      category,
      preparationTime,
      cookingTime,
      servings,
      ingredients,
      cookingInstructions,
      image,
      imagePublicId,
    } = req.body;
    const recipe = await Recipe.create({
      title,
      description,
      cuisine,
      category,
      preparationTime,
      cookingTime,
      servings,
      ingredients,
      cookingInstructions,
      image,
      imagePublicId,
    });
    res.json({
      message: "Recipe Created Successfully",
      data: recipe,
      success: true,
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const recipe = await Recipe.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe Not Found",
      });
    }
    res.json({
      message: "Recipe Updated Successfully",
      data: recipe,
      success: true,
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: "Recipe Not Found",
      });
    }
    if (recipe.imagePublicId) {
      await cloudinary.uploader.destroy(recipe.imagePublicId);
    }
    await Recipe.findByIdAndDelete(id);
    res.json({
      message: "Recipe Deleted Successfully",
      data: recipe,
      success: true,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/uploadFile", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "recipes" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
