import express from "express";
import { RestaurantModel } from "../../database/restaurant";

const Router = express.Router();

/*
Route           /restaurant/?city=
Des             Get all the restaurant details based on the city name
Params          none
Access          Public
Method          GET
*/
Router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const restaurant = await RestaurantModel.find({ city });

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route           /restaurant/:id
Des             Get individual restaurant info based on the id
Params          id
Access          Public
Method          GET
*/

Router.get("/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById( _id );

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: message.error });
  }
});

/*
Route           /restaurant/search
Des             Get name of restaurants by the user search
Params          none
Access          Public
Method          GET
*/

Router.get("/search",async(req,res)=>{
    try{
        const {searchString}= req.body;
        
        const restaurant = await RestaurantModel.find({
            name: {$regex: searchString , $options: "i"},
        });

        if(!restaurant){
            return res.status(404).json({error: `restaurant not found with the search ${searchString}`})
        }

        return res.json({restaurant});

    }catch(error){
        return res.status(500).json({error: error.message})
    }
});

export default Router;