import "dotenv/config.js";
import express from "express";
import { createAndExportPresentation } from "../services/google.js";

const router = express.Router();

router.get('/generate', async (req, res) => {
    try {
        if (!req.body.topic) {
            return res.status(400).json({ message: 'Topic is required in the request body' });
        }

        const topic = req.body.topic;

        let pdfPath = await createAndExportPresentation(topic);
        res.json({message: pdfPath });
    } catch (error) {
        console.error('Error generating slides:', error);
        res.status(500).json({ message: 'Error Generating.' });
    }
});

export default router;