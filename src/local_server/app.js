import express, { json } from "express"
import cors from 'cors';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from 'dotenv'
import db from "./db.js";
import user_router from "./user_router.js"

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

dotenv.config()
app.get("/all_Games", async(req, res)=>{
    const data = await db.game_collection.find({})
    res.send(data)
})
app.get("/comments", async (req, res)=>{
    const comments = await db.comment_collection.find({})
    res.json(comments)
})
app.use("/user", user_router)

app.post('/all_comments', async (req, res)=>{
    const {game_id} = req.body
    const comments_c = db.comment_collection    

    const games_comments = await comments_c.find({game_id})
    res.json(games_comments)
})

const port = process.env.port || 1231 
app.listen(port, ()=>{
    console.log('connected to: ', port);
    
})