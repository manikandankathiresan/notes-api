const Note = require('../../models/notes')

const { signAccessToken } = require('../../helper/modules/jwt-helper');

const notesController = (fastify) => {

    // Controller to get all notes
    const getUserAllNotes = async (req, reply) => {
        try {
            const { userId } = req.params;
            const notes = await Note.find({ userId: userId }).sort({ isPinned: -1 });
            reply.code(200).send({ data: notes });
        } catch (error) {
            throw error;
        }
    };

    // Controller to get a note by ID
    const getNoteById = async (req, reply) => {
        try {
            const noteId = req.params.noteId;
            const note = await Note.findById(noteId);
            if (!note) return reply.code(404).send({ error: true, message: 'Note not found!' });
            reply.code(200).send({ data: note });
        } catch (error) {
            throw error;
        }
    };

    const createNote = async (req, reply) => {
        const { title, content, tags, isPinned, userId } = req.body;

        if (!title) return reply.code(400).send({ error: true, message: 'Title is Required!' });
        if (!content) return reply.code(400).send({ error: true, message: 'Content is Required!' });

        try {
            const note = new Note({
                title,
                content,
                tags: tags || [],
                userId
            });
            const savedNote = await note.save();
            reply.code(201).send({ data: savedNote });
        } catch (error) {
            throw error;
        }
    }

    // Controller to edit a note
    const updatedNoteById = async (req, reply) => {
        const { title, content, tags, isPinned, userId } = req.body;

        if (!title) return reply.code(400).send({ error: true, message: 'Title is Required!' });
        if (!content) return reply.code(400).send({ error: true, message: 'Content is Required!' });

        try {
            const { noteId } = req.params;
            const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content, tags, isPinned, userId }, { new: true });
            if (!updatedNote) return reply.code(404).send({ error: true, message: 'Note not found!' });
            reply.code(200).send({ data: updatedNote });
        } catch (error) {
            throw error;
        }
    };


    // Controller to delete a note
    const deleteNote = async (req, reply) => {
        try {
            const noteId = req.params.noteId;
            const deletedNote = await Note.findByIdAndDelete(noteId);
            if (!deletedNote) return reply.code(404).send({ error: true, message: 'Note not found!' });
            reply.code(204).send();
        } catch (error) {
            throw error;
        }
    };

    // Controller to pin/unpin a note
    const pinNote = async (req, reply) => {
        try {
            const noteId = req.params.noteId;
            const isPinned = req.body.isPinned;
            const updatedNote = await Note.findByIdAndUpdate(noteId, { isPinned }, { new: true });
            if (!updatedNote) return reply.code(404).send({ error: true, message: 'Note not found!' });
            reply.code(200).send({ data: updatedNote });
        } catch (error) {
            throw error;
        }
    };

    const serachNote = async (req, reply) => {
        const { query } = req.query;
        // console.log('reqqq', req.params)
        const { userId } = req.params;
        if (!query) {
            return reply.send({ error: true, message: "Search Query is Required..!" });
        }

        try {
            // Get the search query from the request query

            const matchingNotes = await Note.find({
                userId: userId,
                $or: [
                    { title: { $regex: new RegExp(query, "i") } }, { content: { $regex: new RegExp(query, "i") } }
                ]
            })

            // Return the search results
            reply.code(200).send({ data: matchingNotes });
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            reply.code(500).send({ error: 'Internal Server Error' });
        }

    }


    return { getUserAllNotes, getNoteById, createNote, deleteNote, pinNote, updatedNoteById, serachNote }
}

module.exports = notesController;