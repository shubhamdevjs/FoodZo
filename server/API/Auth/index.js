import express from "express";
import passport from "passport";

import { UserModel } from "../../database/user";

const Router = express.Router();

/*        
Route     =     /auth/signup
Desc      =     Register new user
Params    =     None
Access    =     Public   
Method    =     POST 
*/

Router.post("/signup", async (req, res) => {
  try {
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*        
Route     =     /auth/signin
Desc      =     user login
Params    =     None
Access    =     Public   
Method    =     POST 
*/

Router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route           /auth/google
Desc            route for google authentication 
Params          none
Access          Public
Method          GET
*/

Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/*
Route           /auth/callback
Desc            google callback function
Params          none
Access          Public
Method          GET
*/
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.json({ token: req.session.passport.user.token });
    
  }
); 

export default Router;
