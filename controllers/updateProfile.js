import { UserModel } from "../models/authModel.js";
import { updateProfileValidator } from "../validators/authValidator.js";

export const updateProfile = async (req, res) => {
  try {
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Validate input
    const { error, value } = updateProfileValidator.validate({
      ...req.body,
      profilePicture: req.file?.filename,
    });

    if (error) {
      return res.status(422).json({ message: error.message });
    }

    // Extract validated data
    const { firstName, lastName, phoneNumber } = value;
    const profilePicture = req.file ? req.file.path : value.profilePicture;

    // Update user profile
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.auth.id,
      { $set: { firstName, lastName, phoneNumber, profilePicture } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser, 
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
