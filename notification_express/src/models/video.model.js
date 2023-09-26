// NPM Modules
import { Model } from 'objection';

// Local Modules
// import video_statuses from '../enum/video.status.enum';

class VideoModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'videos'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', maxLength: 255 },
        description: { type: 'string', maxLength: 255 },
        category_id: { type: 'integer' },
        cover_video_path: { type: 'string', maxLength: 255 },
        cover_video_name: { type: 'string', maxLength: 255 },
        video_original_name: { type: 'string', maxLength: 255 },
        video_path: { type: 'string', maxLength: 255 },
        date: { type: 'string', maxLength: 255 },
        secure: { type: 'boolean' },
        secure_start_date: { type: 'string', maxLength: 255 },
        secure_end_date: { type: 'string', maxLength: 255 },
        can_upload: { type: 'boolean' },
        status: { type: 'string', maxLength: 255 },
        format: { type: 'string', maxLength: 255 },
        publish: { type: 'boolean' }
      }
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  // Methods
  static getUploadedVideoById(id) {
    return VideoModel.query()
      .select('*')
      .where('id', id)
      // .where('status', video_statuses.uploaded)
      .where('status', 'uploaded')
      // .throwIfNotFound({ message: `video with id ${id} and with status ${video_statuses.uploaded} is not exist` })
      .throwIfNotFound({ message: `video with id ${id} and with status ${'uploaded'} is not exist` })
      .first();
  }

  static getConvertedVideoById(id) {
    return VideoModel.query()
      .select('*')
      .where('id', id)
      // .where('status', video_statuses.converted)
      .where('status', 'converted')
      .throwIfNotFound({ message: 'this video probably is not converted yet. Please wait until end of converting' })
      .first();
  }

  static getConvertedVideoByIdForCut(id) {
    return VideoModel.query()
      .select('*')
      .where('id', id)
      // .where('status', video_statuses.converted)
      .where('status', 'converted')
      .first()
  }

  static changeStatusById(id, status) {
    return VideoModel.query()
      .patch({ status })
      .where('id', id)
      .returning('*')
      .first();
  }

  static addDurationAndFormatById(id, duration, format) {
    return VideoModel.query()
      .patch({ duration, format })
      .where('id', id)
      .returning('*')
      .first();
  }
}

export default VideoModel;
