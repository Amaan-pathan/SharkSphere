import express from 'express';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/api/auth', router);
app.use('/api/ideas', ideaRoutes);
app.use('/api/ideas',voteRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Entrepreneurship Club API is running!' });
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});