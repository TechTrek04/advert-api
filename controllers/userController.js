import { adModel } from "../models/userModel.js";
import { createAdValidator, replaceAdValidator, updateAdValidator } from "../validators/userValidator.js";


// Add to your existing controller exports
export const searchAds = async (req, res, next) => {
  try {
    // 1. Parse query parameters
    const { 
      title = '',
      category = '',
      minPrice = 0,
      maxPrice = 1000000 // Practical upper limit
    } = req.query;

    // 2. Build the MongoDB query
    const query = {
      ...(title && { title: { $regex: title, $options: 'i' } }), // Case-insensitive title search
      ...(category && { category }), // Exact category match
      price: {
        $gte: Number(minPrice),
        $lte: Number(maxPrice) || 1000000 // Fallback for missing maxPrice
      }
    };

    // 3. Execute the query with default sorting (newest first)
    const ads = await adModel.find(query)
      .sort({ createdAt: -1 })
      .lean(); // Better performance

    // 4. Send standardized response
    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads
    });

  } catch (error) {
    // 5. Consistent error handling
    next(error);
  }
};


export const createAd = async (req, res, next) => {
  try {
    const { error, value } = createAdValidator.validate({...req.body,
      pictures: req.files?.map((file) => {
        return file.filename;
      }),
    });
    if (error) {
      return res.status(422).json(error);
    }

    const result = await adModel.create({...value,
      userId: req.auth.id,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllAds = async (req, res) => {
  try {
   const getAds = await adModel.find();
   res.status(200).json(getAds);
  } catch (error) {
   next(error);
  }
};

export const getAdById = async (req, res) => {
  try {
    const getAdById = await adModel.findById(req.params.id).exec();
    if (!getAdById) return res.status(404).json({ message: "Ad not found" });
    res.status(200).json(getAdById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVendorAds = async (req, res) => {
  try {
    const userId = req.auth.id
    const ads = await adModel.find({userId}).exec();
    if (!ads) return res.status(404).json({ message: "Vendor not found!" });
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
};




export const updateAd = async (req, res, next) => {
    try {
      // Validate request body
      const { error, value } = updateAdValidator.validate({...req.body,
        pictures: req.files?.map((file) => {
          return file.filename;
        }),
      });
      if (error) {
        return res.status(422).json({ message: error.details[0].message });
      }
      console.log(error)
  
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
      const { error, value } = replaceAdValidator.validate({...req.body, 
        pictures: req.files?.map((file) => {
          return file.filename;
        }),
      });
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
