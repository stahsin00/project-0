import "dotenv/config.js";
import express from "express";
import { createAndExportPresentation } from "../services/google.js";

const router = express.Router();

router.get('/generate', async (req, res) => {
    try {
        let testTopic = `PitchMint: Crude Brainstorm → Clutch Collaboration (Idea-to-Pitch Platform)
                        Concept: An online workspace where a user can dump random ideas or partially formed concepts, and the platform uses AI or structured templates to develop them into a clear, “clutch” pitch or project plan.
                        “Crude” Aspect: Disorganized brainstorming—lots of half-baked ideas, bullet points, and scattered thoughts.
                        “Clutch” Outcome: A polished outline or pitch deck with well-defined milestones, tasks, and roles, ready to present to stakeholders or judges."`

        let pdfPath = await createAndExportPresentation(testTopic);
        res.json({message: pdfPath });
    } catch (error) {
        console.error('Error generating slides:', error);
        res.status(500).json({ message: 'Error Generating.' });
    }
});

export default router;