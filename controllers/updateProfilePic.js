import { UserModel } from "../models/authModel.js";
import { updateProfileValidator } from "../validators/authValidator.js";

export const updateProfilePicture = async (req, res) => {
  try {
    //ensure user is authenticated
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    //validating
    const { error, value } = updateProfileValidator.validate(req.body);
    if (error) {
      return res.staus(422).json({ message: error.message });
    }

    //getting profile pic
    const profilePicture = req.file ? req.file.path : value.profilePicture;
    if (!profilePicture) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    //updated profile
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.auth.id,
      { $set: { profilePicture } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicture: updatedUser.profilePicture,
    });

  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json("Internal server error");
  }
}