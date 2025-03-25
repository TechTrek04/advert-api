import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { profilePicture } from "../middlewares/profile_upload.js";
import { updateProfile } from "../controllers/updateProfile.js";



const authRouter = Router();

authRouter.post('/signup', registerUser);

authRouter.post('/login', loginUser);

authRouter.patch("/update/profile", isAuthenticated, profilePicture.single("profilePicture"), updateProfile);


export default authRouter