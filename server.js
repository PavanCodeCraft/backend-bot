import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Allow frontend to access the backend
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true 
}));

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash-001"; // Updated model

// Root route (optional)
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// Chat API route
app.post("/api/chat", async (req, res) => {
    try {
        console.log("Received request:", req.body); // Debugging

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
