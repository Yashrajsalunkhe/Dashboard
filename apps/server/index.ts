import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import signup from './routes/signup';
import signin from './routes/signin';

const app = express();

app.use(cors());
app.use(express.json())

app.post("/signup", signup);
app.post("/signin", signin)

app.listen(3000);