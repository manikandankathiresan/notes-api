const notesRouter = (fastify, options, done) => {

    // All routes placed here
    const noteController = require('../../controllers/note')(fastify)

    fastify.get(
        '/get-all-notes/:userId', noteController.getUserAllNotes)

    fastify.get('/get-note/:noteId', noteController.getNoteById)

    fastify.post('/create-note', noteController.createNote)

    fastify.delete('/delete/:noteId', noteController.deleteNote)

    fastify.put('/update/:noteId', noteController.updatedNoteById)

    fastify.put('/pin/:noteId', noteController.pinNote)

    fastify.get('/:userId/search', noteController.serachNote)

    done();

}

module.exports = notesRouter;