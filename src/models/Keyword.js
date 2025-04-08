import mongoose from 'mongoose';

const KeywordSchema = new mongoose.Schema({
    paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
    keyword: { type: String, required: true }
});

export default mongoose.models.Keyword || mongoose.model('Keyword', KeywordSchema);