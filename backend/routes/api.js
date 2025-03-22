import "dotenv/config.js";
import express from "express";
import { createAndExportPresentation } from "../services/google.js";

const router = express.Router();

router.get('/generate', async (req, res) => {
    try {
        let pdfPath = await createAndExportPresentation();
        res.json({message: pdfPath });
    } catch (error) {
        console.error('Error generating slides:', error);
        res.status(500).json({ message: 'Error Generating.' });
    }
});

export default router;