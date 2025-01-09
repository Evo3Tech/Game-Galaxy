import express, { json } from "express"
import path from "path"
import cors from 'cors';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from 'dotenv'
import db from "./db.js";
import user_router from "./user_router.js"

dotenv.config()
const app = express()
app.options("/user/login", cors())
app.use(cors({
    origin: [process.env.FRONT_SERVER_URL],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.use("/user", user_router)


app.post('/all_comments', async (req, res)=>{
    
    const {game_id} = req.body
    const comments_c = db.comment_collection    

    const games_comments = await comments_c.find({game_id})
    res.json(games_comments)
})
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'dist', 'index.html'))});

const port = process.env.port || 1231 
app.listen(port, ()=>{
    console.log('connected to: ', port);
    
})