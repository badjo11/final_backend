const { Problem } = require("../models");
const { CREATE_SUCCESS, DELETE_SUCCESS } = require("../utils/consts");
const ErrorHandler = require("../utils/error-handler");
const ProblemService = require("./../services/problem-service.js");

const create = async (req, res, next) => {
  try {
    const { title, description, tag } = req.body;
    const { id } = req.user;
    let images
    if (req.files) {
      images = req.files.images
    }
    await ProblemService.create(title, description, id, tag, images);
    res.json(CREATE_SUCCESS);
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    let { q, page, limit, tag } = req.query
    page = page || 1
    limit = limit || 10

    const offset = page * limit - limit

    const problems = await ProblemService.getAll({ offset, limit, q, tag })

    res.json(problems)
  } catch (e) {
    res.status(404).json({ message: "Tag not found" })
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params
    await ProblemService.deleteOne(id)
    res.json({ message: DELETE_SUCCESS })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  create,
  getAll,
  deleteOne
};
