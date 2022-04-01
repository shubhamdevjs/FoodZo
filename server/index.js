require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";

import Auth from "./API/Auth/index"
import ConnectDB from "./Database/connection";

const zomato = express();


zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(cors());      
zomato.use(helmet());

zomato.use("/auth", Auth);


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