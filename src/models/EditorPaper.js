import mongoose from 'mongoose';

const EditorPaperSchema = new mongoose.Schema({
    source: String
});

export default mongoose.models.EditorPaper || mongoose.model('EditorPaper', EditorPaperSchema);