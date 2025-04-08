import mongoose from 'mongoose';

const BusinessScoreSchema = new mongoose.Schema({
    paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
    business_score: Number,
    business_score_adjusted: Number,
    business_score_justification: String
});

export default mongoose.models.BusinessScore || mongoose.model('BusinessScore', BusinessScoreSchema);