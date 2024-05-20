import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const { ingredient } = req.query;
        const response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        res.status(200).json(data.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
