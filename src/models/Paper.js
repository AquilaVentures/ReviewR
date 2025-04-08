import mongoose from 'mongoose';

const PaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    abstract: String,
    source: String,
    pdf: String,
    journal: String,
    publication_year: String,
    created_on: { type: Date, default: Date.now },
    email: String,
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
    business_scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessScore' }],
    keywords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }]
});

export default mongoose.models.Paper || mongoose.model('Paper', PaperSchema);