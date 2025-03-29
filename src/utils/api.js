import axios from "axios";

export const uploadFileToAI = async (formData) => {
    try {
        const response = await axios.post("/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
};
