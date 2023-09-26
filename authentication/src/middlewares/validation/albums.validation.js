import { AlbumsSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class AlbumsValidationMiddleware {
  static validateGetByIdArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AlbumsSchema.getByIdSchema, next);
  }

  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AlbumsSchema.addSchema, next);
  }

  static validateEditArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AlbumsSchema.editSchema, next);
  }

  static validateEditPublishArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AlbumsSchema.editPublishSchema, next);
  }

  static validateFindByDate(req, res, next) {
    ValidatorUtil.validateArgs(req, AlbumsSchema.findByDateSchema, next);
  }

  static validateDeleteArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AlbumsSchema.deleteSchema, next);
  }

  static validateBulkDeleteArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AlbumsSchema.bulkDeleteSchema, next);
  }
}

export default AlbumsValidationMiddleware;
