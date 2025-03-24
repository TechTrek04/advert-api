import { Router } from "express";
import { createAd, deleteAd, getAllAds,  replaceAd,  updateAd,  } from "../controllers/userController.js"
import { productPicturesUpload } from "../middlewares/upload.js";

//Create Book Router
const adRouter = Router();

//Defining Route
adRouter.get("/ad", getAllAds);
adRouter.post("/ad",  productPicturesUpload.array("pictures",10),createAd);
adRouter.put("/ad/:id", replaceAd)
adRouter.patch("/ad/:id",  updateAd);
adRouter.delete("/ad/:id", deleteAd);

//exporting Router

export default adRouter;
