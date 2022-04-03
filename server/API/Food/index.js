import express from "express";
import { FoodModel } from "../../database/allModels";

const Router = express.Router();

/*
Route           /food/:_id
Des             Get specific food
Params          _id
Access          Public
Method          GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.findById(_id);
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: message.error });
  }
});

/*
Route           /food/r/:_id
Des             Get all food based on retaurants
Params          _id
Access          Public
Method          GET
*/

Router.get("/r/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.find({ restaurant: _id });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: message.error });
  }
});

/*
Route           /food/c/:_id
Des             Get food by category
Params         category
Access          Public
Method          GET
*/

Router.get("/c/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    return res.json({foods});
  } catch (error) {
    return res.status(500).json({ error: message.error });
  }
});

export default Router;