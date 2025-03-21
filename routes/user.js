import { Router } from "express";
import { createAd, deleteAd, getAllAds,  replaceAd,  updateAd,  } from "../controllers/userController.js"

//Create Book Router
const adRouter = Router();

//Defining Route
adRouter.get("/ad", getAllAds);
adRouter.post("/ad",  createAd);
adRouter.put("/ad/:id", replaceAd)
adRouter.patch("/ad/:id",  updateAd);
adRouter.delete("/ad/:id", deleteAd);

//exporting Router

export default adRouter;
