import { adModel } from "../models/userModel.js";
import { adValidator } from "../validators/userValidator.js";

export const createad = async (req, res, next) => {
  try {
    const { error, value } = adValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    const result = await adModel.create({
      ...value
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllads = async (req, res) => {
  try {
    //use for filtering
    const { filter = "{}", sort = "{}" } = req.query;
    const getads = await adModel
      .find(JSON.parse(filter))
      .sort(JSON.parse(sort));

    res.status(201).json(getads);
  } catch (error) {
    next(error);
  }
};

export const updatead = async (req, res, next) => {
  try {
    const result = await adModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(result);
    if (!updatedad) return res.status(404).json({ message: "ad not found" });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adModel.findByIdAndDelete(id).exec();
    res.status(200).json({ message: "ad Deleted!" });
  } catch (error) {
    next(error);
  }
};
