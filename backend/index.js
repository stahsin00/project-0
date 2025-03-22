import "dotenv/config.js";
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});