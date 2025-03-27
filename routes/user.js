import { Router } from "express";
import {
  createAd,
  deleteAd,
  getAdById,
  getAllAds,
  searchAds,
  replaceAd,
  updateAd,
  getVendorAds,
} from "../controllers/userController.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";
import { productPicturesUpload } from "../middlewares/upload.js";

//Create Book Router
const adRouter = Router();

//Defining Route
adRouter.get("/ad", getAllAds);

adRouter.get('/ad/search', searchAds)

adRouter.get("/ad/vendor", isAuthenticated, getVendorAds)
adRouter.get("/ad/:id", getAdById);

adRouter.post(
  "/ad",
  isAuthenticated,
  isAuthorized(["vendor"]),
  productPicturesUpload.array("pictures", 3),
  createAd
);

adRouter.put(
  "/ad/:id",
  isAuthenticated,
  productPicturesUpload.array("pictures", 3),
  replaceAd
);

adRouter.patch(
  "/ad/:id",
  isAuthenticated,
  productPicturesUpload.array("pictures", 3),
  updateAd
);


adRouter.delete("/ad/:id", isAuthenticated, deleteAd);


//exporting Router

export default adRouter;
