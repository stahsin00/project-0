import "dotenv/config.js";
import express from "express";
import fs from "fs";
import { createAndExportPresentation } from "../services/google.js";

const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
        if (!req.body.topic) {
            return res.status(400).json({ message: 'Topic is required in the request body' });
        }

        const topic = req.body.topic;

        const pdfPath = await createAndExportPresentation(topic);
        
        const pdfBuffer = fs.readFileSync(pdfPath);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="presentation-${topic}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating slides:', error);
        res.status(500).json({ message: 'Error Generating Presentation', error: error.message });
    }
});

export default router;