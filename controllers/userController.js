import { adModel } from "../models/userModel.js";
import { createAdValidator, replaceAdValidator, updateAdValidator } from "../validators/userValidator.js";

export const createAd = async (req, res, next) => {
  try {
    const { error, value } = createAdValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    const result = await adModel.create(value);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllAds = async (req, res) => {
  try {
    const getads = await adModel.find();
    res.status(201).json(getads);
  } catch (error) {
    next(error);
  }
};

export const updateAd = async (req, res, next) => {
    try {
      // Validate request body
      const { error, value } = updateAdValidator.validate(req.body);
      if (error) {
        return res.status(422).json({ message: error.details[0].message });
      }
  
      // Update the ad
      const result = await adModel.findByIdAndUpdate(req.params.id, value, {
        new: true, 
        runValidators: true, 
      });
  
      // Check if the ad exists
      if (!result) {
        return res.status(404).json({ message: "Ad not found" });
      }
  
      // Return the updated ad
      res.status(200).json(result);
    } catch (error) {
      next(error); 
    }
  };
  

export const replaceAd = async (req, res, next) => {
    try {
      // Validate incoming request
      const { error, value } = replaceAdValidator.validate(req.body);
      if (error) {
        return res.status(422).json({ message: error.details[0].message });
      }
  
      // Perform replace operation
      const result = await adModel.findOneAndReplace(
        { _id: req.params.id },
        value,
        { returnDocument: "after" } 
      );
  
      // If no record is found, return a 404 error
      if (!result) {
        return res.status(404).json({ message: "Ad not found" });
      }
  
      // Return the updated document
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  

export const deleteAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adModel.findByIdAndDelete(id).exec();
    if (!updateAd) {
      return res.status(404).json({
        message: "Ad not found!",
      });
    }

    res.json({ message: "Ad deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
