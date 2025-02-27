import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Allow frontend access
app.use(
    cors({
        origin: "https://your-frontend-url.vercel.app", // ✅ Use your actual frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    })
);

const API_KEY = process.env.GEMINI_API_KEY;

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

app.post("/api/chat", async (req, res) => {
    try {
        console.log("Received request:", req.body); // Debugging

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
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
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
