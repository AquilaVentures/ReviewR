import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    joined_on: { type: Date, default: Date.now }
});

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);