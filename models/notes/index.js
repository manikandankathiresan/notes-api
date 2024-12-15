const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Note schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },

},
    { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create and export the Note model
module.exports = mongoose.model('Note', noteSchema);
