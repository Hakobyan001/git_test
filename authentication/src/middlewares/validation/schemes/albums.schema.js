/* eslint-disable max-len */
// NPM Modules
import Joi from 'joi';

// Local MOdules
import { ID } from './type';

const AlbumsSchema = {

  addSchema: {
    body: Joi.object({
      title: Joi.string().min(4).max(255).required(),
      description: Joi.string().min(4).max(2000).required(),
      date: Joi.string()
        .pattern(/^20[2-3][0-9]-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/)
        .required()
        .messages({
          'string.pattern.base': 'The date format is invalid. It should be in the format "YYYY-MM-DDTHH:mm:ss.SSSZ" and between the years 2023 and 2039.'
        }),
      execution_date: Joi.string()
        .pattern(/^20[2-3][0-9]-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/)
        .required()
        .messages({
          'string.pattern.base': 'The date format is invalid. It should be in the format "YYYY-MM-DDTHH:mm:ss.SSSZ" and between the years 2023 and 2039.'
        }),
      category_id: Joi.number().integer().required(),
      cover_image_path: Joi.string().max(255).required(),
      cover_image_name: Joi.string().max(255).required(),
      publish: Joi.boolean(),
      tag: Joi.string().min(1).max(255).required(),
      picture_original_names: Joi.array().items(Joi.string()).min(1).required(),
      picture_paths: Joi.array().items(Joi.string()).min(1).required()
    })
  },

  getByIdSchema: {
    params: Joi.object({
      id: ID.required()
    })
  },
  editSchema: {
    params: Joi.object({
      id: ID.required()
    }),
    body: Joi.object({
      title: Joi.string().min(4).max(255),
      description: Joi.string().min(4).max(2000),
      date: Joi.string()
        .pattern(/^20[2-3][0-9]-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/)
        .messages({
          'string.pattern.base': 'The date format is invalid. It should be in the format "YYYY-MM-DDTHH:mm:ss.SSSZ" and between the years 2023 and 2039.'
        }),
      execution_date: Joi.string()
        .pattern(/^20[2-3][0-9]-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/)
        .messages({
          'string.pattern.base': 'The date format is invalid. It should be in the format "YYYY-MM-DDTHH:mm:ss.SSSZ" and between the years 2023 and 2039.'
        }),
      category_id: Joi.number().integer(),
      cover_image_path: Joi.string().max(255),
      cover_image_name: Joi.string().max(255),
      publish: Joi.boolean(),
      pictures: Joi.object({
        deleted: Joi.array().items(Joi.number().integer()).min(1),
        created: Joi.object({
          picture_original_names: Joi.array().items(Joi.string()).min(1),
          picture_paths: Joi.array().items(Joi.string()).min(1)
        }),
        renamed: Joi.object({
          ids: Joi.array().items(Joi.number().integer()).min(1),
          picture_original_names: Joi.array().items(Joi.string().min(1).max(255))
        })
      }).optional(),
      tag: Joi.string().min(1).max(255)
    }).or(
      'title',
      'description',
      'date',
      'execution_date',
      'category_id',
      'publish',
      'tag',
      'pictures',
      'cover_image_path',
      'cover_image_name'
    )
  },

  editPublishSchema: {
    body: Joi.object({
      ids: Joi.array().items(Joi.number().integer()).min(1).required(),
      publish: Joi.boolean().required()
    })
  },

  findByDateSchema: {
    body: Joi.object({
      date: Joi.string().min(1).max(255)
    })
  },

  deleteSchema: {
    params: Joi.object({
      id: ID.required()
    })
  },
  bulkDeleteSchema: {
    body: Joi.object({
      ids: Joi.array().items(Joi.number().integer()).min(1).required()
    })
  }
};

export default AlbumsSchema;
