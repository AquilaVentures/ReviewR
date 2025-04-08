import mongoose from 'mongoose';

const IgnoredLinkSchema = new mongoose.Schema({
    source: String
});

export default mongoose.models.IgnoredLink || mongoose.model('IgnoredLink', IgnoredLinkSchema);