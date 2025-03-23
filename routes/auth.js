import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { updateProfilePicture } from "../controllers/updateProfilePic.js";



const authRouter = Router();

authRouter.post('/signup', registerUser);

authRouter.post('/login', loginUser);

authRouter.patch('/update/profile-picture', isAuthenticated, updateProfilePicture)


export default authRouter