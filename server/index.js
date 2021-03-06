require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

import googleAuthConfig from './config/google.config'

import Auth from "./API/Auth/index"
import Food from "./API/Food/index"
import Resaturant from "./API/Restaurant/index"
import Image from "./API/Image/index"

import ConnectDB from "./database/connection";

const zomato = express();

googleAuthConfig(passport);

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(cors());      
zomato.use(helmet());
zomato.use(session({ secret: 'SECRET' }));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.use("/auth", Auth);
zomato.use("/restaurant", Resaturant);
zomato.use("/food", Food);  
zomato.use("/image", Image);


zomato.get("/", (req, res) => { 
    res.json({ message: "Setup Successful" });
  }); 

  zomato.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("Server up and Running "))
    .catch((error) => {
      console.log(error);
      console.log("Server is running, but database connection failed ...");
    })
);    