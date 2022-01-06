const { Op } = require("sequelize");
const { Problem, Picture } = require("./../models");
const PictureService = require('./../services/picture-service')
const ErrorHandler = require("./../utils/error-handler.js");

const create = async (title, description, userId, tag, images) => {
  const problem = await Problem.create({ title, description, userId, tag });
  if (Array.isArray(images)) {

    images.forEach((item) => {
      PictureService.createPicture(item, problem.id)
    })
  } else {
    PictureService.createPicture(images, problem.id)
  }
  return problem
};

const getAll = async ({ offset, limit, q, tag }) => {
  if (q || tag) {
    q = q || ""
    if (tag) {
      return await Problem.findAndCountAll({
        where: {

          [Op.or]: [
            {
              title: {
                [Op.iLike]: '%' + q + '%'
              }
            }
          ],
          tag,
        },
        include: [
          {
            model: Picture
          }
        ],
        limit,
        offset
      })
    }
    else {
      return await Problem.findAndCountAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: '%' + q + '%'
              }
            }
          ],
        },
        include: [
          {
            model: Picture
          }
        ],
        limit,
        offset
      })
    }
  }

  return await Problem.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: Picture
      }
    ],
  })
}

const deleteOne = async (id) => {
  return await Problem.destroy({ where: { id } })
}

module.exports = {
  create,
  getAll,
  deleteOne
};
