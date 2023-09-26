import { Model } from 'objection';
import SearchBuilder from './builder/search.builder';

class AlbumsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'albums'; }

  static get QueryBuilder() { return SearchBuilder; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', maxLength: 255 },
        description: { type: 'string', maxLength: 2000 },
        date: { type: 'string', maxLength: 255 },
        execution_date: { type: 'string', maxLength: 255 },
        cover_image_path: { type: 'string', maxLength: 255 },
        publish: { type: 'boolean' },
        category_id: { type: 'integer' },
        cover_image_name: { type: 'string', maxLength: 255 }
      }
    };
  }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  // Methods
  static getAlbum(id, role) {
    const newDate = new Date();

    return AlbumsModel.query()
      .select('*')
      .first()
      .where('albums.id', '=', id)
      .andWhere(function () {
        if (role === 'member') {
          this
            .where('albums.publish', '=', true)
            .andWhereRaw('?? <= ?', ['albums.date', newDate.toISOString()]);
        }
      });
  }
}

export default AlbumsModel;
