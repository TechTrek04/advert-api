import { Router } from "express";
import { createad, deletead, getAllads, updatead } from "../controllers/userController.js"

//Create Book Router
const adRouter = Router();

//Defining Route
adRouter.get("/ad", getAllads);
adRouter.post("/ad",  createad);
adRouter.patch("/ad/:id",  updatead);
adRouter.delete("/ad/:id", deletead);

//exporting Router

export default adRouter;
