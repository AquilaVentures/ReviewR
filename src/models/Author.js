import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    created_on: { type: Date, default: Date.now },
    papers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }]
});

// Prevent model overwrite upon hot reload
export default mongoose.models.Author || mongoose.model('Author', AuthorSchema);