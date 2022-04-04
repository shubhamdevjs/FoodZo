import express from "express";
import { OrderModel } from "../../database/order";

const Router = express.Router();

/*
Route           /order/:_id
Des             Get all orders based on id
Params          _id
Access          Public
Method          GET
*/

Router.get("/:_id", async (res, req) => {
  try {
    const { _id } = req.params;
    const getOrder = await OrderModel.findById({ user: _id });
    if (!getOrder) {
      return res.status(400).json({ error: "user not found" });
    }
    return res.status(200).json({ orders: getOrder });
  } catch (error) {
    return res.status(500).json({ error: message.error });
  }
});

/*
Route           /restaurant/new/:_id
Des             Add new order
Params          _id
Access          Public
Method          POST
*/

Router.post("/new", async (res, req) => {
  try {
    const { orderDetails } = req.body;
    const addNewOrder = await OrderModel.findOneAndUpdate(
      { user: _id },
      {
        $push: { orderDetails },
      },
      {
        new: true,
      }
    );
      return res.json({order: addNewOrder});

  } catch (error) {
    return res.status(500).json({ error: message.error });
  }
});

export default Router;