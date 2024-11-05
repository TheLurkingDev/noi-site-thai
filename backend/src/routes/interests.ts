import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Create a new pool using the connection string
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

// GET /api/interests - Get all interests
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM interests ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching interests:', error);
        res.status(500).json({ error: 'Failed to fetch interests' });
    }
});

// GET /api/interests/categories - Get all unique categories
router.get('/categories', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT DISTINCT category FROM interests ORDER BY category');
        res.json(result.rows.map(row => row.category));
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// GET /api/interests/category/:category - Get interests by category
router.get('/category/:category', async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const result = await pool.query(
            'SELECT * FROM interests WHERE category = $1 ORDER BY name',
            [category]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching interests by category:', error);
        res.status(500).json({ error: 'Failed to fetch interests by category' });
    }
});

export default router;
