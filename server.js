import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Use the cors middleware
app.use(cors());

// Define route handler for /meals endpoint
app.get('/meals', async (req, res) => {
    try {
        const { ingredient } = req.query;
        const response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        res.json(data.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define route handler for /mealDetails endpoint
app.get('/mealDetails', async (req, res) => {
    try {
        const { mealId } = req.query;
        const response = await fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        res.json({ meal: data.meals[0] });
    } catch (error) {
        console.error('Error fetching meal details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
