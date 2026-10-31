import "dotenv/config";
import express from "express";
import { connectDb } from "./db/connectDb.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import recipeRoutes from "./routes/recipe.js";
const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({
    message: "Hello From Server",
  });
});

app.use("/api/recipes", recipeRoutes);

app.use(errorHandler);
connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started on PORT : ${process.env.PORT}`);
    });
  })
  .catch((e) => console.log(`Db Connection Error : ${e}`));
