import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const { mealId } = req.query;
        const response = await fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        res.status(200).json({ meal: data.meals[0] });
    } catch (error) {
        console.error('Error fetching meal details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
