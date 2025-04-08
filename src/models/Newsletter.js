import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribed_on: { type: Date, default: Date.now }
});

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);