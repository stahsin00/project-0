import express from 'express';
import { createAndExportPresentation } from '../services/google.js';
import fs from 'fs';

const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
        const { topic } = req.body;
        
        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }
        
        const pdfPath = await createAndExportPresentation(topic);
        
        const pdfBuffer = fs.readFileSync(pdfPath);
        
        const safeFilename = encodeURIComponent(`presentation-${topic}.pdf`);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        
        res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error('Error generating slides:', error);
        res.status(500).json({ error: 'Failed to generate presentation', details: error.message });
    }
});

export default router;