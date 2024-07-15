const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, descriptions, rating, tags } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("movieNotes").insert({
      title,
      descriptions,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("movieTags").insert(tagsInsert);

    response.json();
  }
}

module.exports = NotesController;
