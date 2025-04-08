import dbConnect from "./mongodb";


export default function apiHandler(handler) {
    return async (req, res) => {
        try {
            await dbConnect();
            console.log('Connected to MongoDB');
            return handler(req, res);
        } catch (error) {
            console.error('Database connection error:', error);
            return res.status(500).json({ error: 'Database connection failed' });
        }
    };
}