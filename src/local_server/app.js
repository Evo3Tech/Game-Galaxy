import fs from "fs"
import express, { json } from "express"
import cors from 'cors';
import { doesNotMatch } from "assert";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import { type } from "os";



const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const abs_path = fileURLToPath(import.meta.url)
const current_path = dirname(abs_path)
console.log(join(current_path,""));



dotenv.config()
const gameSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    category: { type: String, required: true },
    themes: [{ type: String }],
    genres: [{ type: String }],
    game_modes: [{ type: String }],
    cover: { type: String },
    screenshots: [{ type: String }],
    videos: [{ type: String }],
    created_at: { type: Date },
    release_dates: [{ type: Number }],
    updated_at: { type: Number },
    first_release_date: { type: Date },
    rating: { type: Number },
    total_rating: { type: Number },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    similar_games: [{ type: Number }],
    summary: { type: String },
    storyline: { type: String },
    platforms: [{ type: Number }],
    url: { type: String }
})
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    pwd: { type: String, required: true },
    liked: [ { type: mongoose.Schema.Types.Number} ],
    favorites: [{ type: String }],
    friends: [
        {
            id: { type: mongoose.Schema.Types.String },
            name: { type: mongoose.Schema.Types.String }
        }
    ],
    avatar: { type: String},
    gamingPlatform: { type: String, default: '' },
    gamerTag: { type: String, default: '' },
    playstyle: { type: String, default: '' },
    streamingLink: {type: String, default: '' }
})
const commentSchema = new mongoose.Schema({
    comment_id: { type: Number, required: true, unique: true},
    user_id: { type: String, required: true},
    game_id: { type: String, required: true},
    writer: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: mongoose.Schema.Types.Number, default: 0},
    user_img: { type: String},
})
async function connect_db() {
    return await mongoose.connect(process.env.mongo_connection)
    .then(async ()=>{
        console.log('connected to db');
        const game_collection = mongoose.model("game", gameSchema)
        const user_collection = mongoose.model("user", userSchema)
        const comment_collection = mongoose.model("comment", commentSchema)
        return {
            game_collection: game_collection, 
            user_collection: user_collection,
            comment_collection: comment_collection,
        }
    })
    .catch((err)=>{
        console.error('couldnt connect to db', err);
    })
    
}
async function get_user(u_name='') {
    const db = await connect_db()
    const users = db.user_collection
    if(u_name != ''){
        return await users.findOne({name : u_name})
    }
    return await users.find({})
}
async function toggle_favorite(u_name, game_id, res) {
    try {
        const db = await connect_db()
        const users = db.user_collection
        const current_user = await get_user(u_name)
        if(current_user.favorites.includes(game_id)){
            await users.updateOne(
                {name: u_name},
                {$pull: {"favorites": game_id}}
            )
            res.status(202).send('game removed from favorites')
        }
        else{
            await users.updateOne(
                {name: u_name},
                {$push: {"favorites": game_id}}
            )
            res.status(201).send('game added to favorites')
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

async function change_image(user_id, srcimg, res) {
    try {
        const db = await connect_db()
        const users = db.user_collection
        await users.updateOne(
            {id: user_id},
            {avatar: srcimg}
        )
        res.status(202).send('image updated')
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
async function verify_user(user_i, res) {
    const collections = await connect_db()
    try {
        const search_u = await collections.user_collection.findOne({name: user_i.name})
        if(search_u){
            const verified_user = search_u.name == user_i.name && search_u.pwd == user_i.pwd
            if(verified_user){
                console.log('user found')
                console.log(search_u)
                res.send(JSON.stringify(search_u))
            }
            else{
                res.status(404).send('')
            }
        }
        else{
            console.warn('user not found')
            res.status(404).send('')
        }
    } catch (error) {
        console.log(error);
    }    
}
async function add_rm_friend(user_id, target_u_id,target_friend_name, res) {
    try {
        const db = await connect_db()
        const users = db.user_collection
        const current_user = await users.findOne({id: user_id})
        if(current_user.friends.some(fr=>fr.id == target_u_id)){
            const target_friend = {id: target_u_id, name: target_friend_name}
            await users.updateOne(
                {id: user_id},
                {$pull: {friends: target_friend}}
            )
            res.status(201).send('friend removed')
        }
        else{
            const new_friend = {id: target_u_id, name: target_friend_name}
            await users.updateOne(
                {id: user_id},
                {$push: {"friends": new_friend}}
            )
            res.status(200).send('friend added')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
async function add_like(username, comment_id, res) {
    
    let user = await get_user(username)
    const db = await connect_db()
    
    if(user.liked.includes(comment_id)){
        await db.user_collection.updateOne({name: username}, {$pull: {"liked": comment_id}})  
        await decrease_like_count(comment_id)
        res.status(202).send('removed')
    }
    else{
        console.warn('user:', user);
        await db.user_collection.updateOne({name: username}, {$push: {liked: comment_id}})  
        console.warn('liked:', comment_id);
        await increase_like_count(comment_id)
        res.status(201).send('added')
    }
}
async function increase_like_count(comment_id) {
    const db = await connect_db()
    await db.comment_collection.updateOne({comment_id}, {$inc: {likes: 1}})
}
async function decrease_like_count(comment_id) {
    const db = await connect_db()
    await db.comment_collection.updateOne({comment_id}, {$inc: {likes: -1}})
}
app.get("/all_Games", async(req, res)=>{
    const collections = await connect_db()    
    const data = await collections.game_collection.find({})
    res.send(data)
})
app.post("/sign_up", async(req, res)=>{
    const { username, email, password } = req.body;

    const existingUser = await get_user(username);

    if (existingUser) {
        return res.status(400).json({ message: "Username already exists. Please choose another." });
    }

    const new_user = {
        id: `${username}--${email}`,
        name: username,
        email: email,
        pwd: password,
        liked: [],
        favorites: [],
        friends: [],
        avatar: "/src/imgs/avatars/unknown.png",
        gamingPlatform: "",
        gamerTag: "",
        playstyle: "",
        streamingLink: "",
    };
    const collections = await connect_db()
    try {
        await collections.user_collection.insertMany(new_user)
        res.status(200).send(new_user)
    } catch (error) {
        console.log(error);
        res.status(500).send(new_user)
    }
})
app.post("/login", (req, res)=>{
    const {username, password} = req.body
    verify_user({name: username, pwd: password}, res)
})
app.post("/favorite",async(req,res)=>{
    const {Username,Game}=req.body
    toggle_favorite(Username, Game.id, res)
})

app.post("/changeAvatar",async (req,res)=>{
    const {userid,srcimg}=req.body
    await change_image(userid, srcimg, res)
})
app.post('/update_user',async (req, res) => {
    const { user_id, updated_data } = req.body;
    const db = await connect_db()
    const user = await db.user_collection.findOne({id: user_id})
    if (user) {
        console.log('assadsad: ', user);
        
        await update_user(user, updated_data); 
        res.status(200).json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});
async function update_user(target_user, updated_data) {
    const db = await connect_db()
    console.log(updated_data);
    
    await db.user_collection.updateOne({id: target_user.id}, {$set: updated_data})
}
app.post('/friends/add', async (req, res)=>{
    const {user_id, target_friend_id, target_friend_name} = req.body
    await add_rm_friend(user_id, target_friend_id, target_friend_name, res)
})

app.post('/add_comment', async(req, res)=>{
    const {username, game_id ,comment_txt, user_id, user_img} = req.body
    await add_comment(game_id, username, comment_txt, user_id, user_img, res)
})
async function add_comment(game_id, username, comment_txt, user_id, user_img, res) {
    try {
        const db = await connect_db()
        const comments_c = db.comment_collection      
        let last_comment = await comments_c.find({}, {comment_id: 1}).sort({comment_id: 1}).limit(1)        
        let last_comment_id
        if(!last_comment.length) last_comment_id = 0
        else{
            last_comment_id = last_comment[0].comment_id     
        }
        comments_c.insertMany([
            {
                comment_id : last_comment_id + 1,
                user_id : user_id,
                game_id : game_id,
                writer : username,
                text : comment_txt,
                likes : 0,
                user_img : user_img
            }
        ])
        res.send('comment added')
    } catch (error) {
        console.log(error)
        res.status(400).send('comment not added')
    }
}
app.post('/all_comments', async (req, res)=>{
    const {game_id} = req.body
    const db = await connect_db()
    const comments_c = db.comment_collection    

    const games_comments = await comments_c.find({game_id})
    res.json(games_comments)
})
app.get("/comments", async (req, res)=>{
    const db = await connect_db()
    const comments = await db.comment_collection.find({})
    res.json(comments)
})
app.post('/add_like', async (req, res)=>{
    const {name, comment_id} = req.body
    try {
        await add_like(name, comment_id, res)
    } catch (error) {
        res.status(512).send(error.message)
    }
})
function get_all_messages() {
    let all_messages = fs.readFileSync(join(current_path, "messages.json"), 'utf-8')
    all_messages = JSON.parse(all_messages)
    return all_messages
}
function create_message_box(user1_id, user2_id) {
    let new_message = {
        id: user1_id+user2_id,
        user1_id: user1_id,
        user2_id: user2_id,
        messages: [
        ]
    }
    let all_messages = get_all_messages()
    if (all_messages.some(message=>message.id ==  user2_id+user1_id || message.id ==  user1_id+user2_id)){
        return
    }
    all_messages.push(new_message)
    fs.writeFileSync(join(current_path, "messages.json"), JSON.stringify(all_messages, null, 2))
}
function get_messages(user1_id, user2_id) {
    let target_msg = {
        id1: user1_id+user2_id,
        id2: user2_id+user1_id
    }
    let all_message = get_all_messages()

    return all_message.find((message)=>message.id == target_msg.id1 || message.id == target_msg.id2)
}
app.post('/messages', (req,res)=>{
    const {user_1, user_2} = req.body
    res.send(get_messages(user_1, user_2))
})
app.post('/messages/send', (req, res)=>{
    const {user_id, text, message_box_id} = req.body
    console.log('=');
    console.log(user_id, text, message_box_id);
    console.log('=');
    
    let all_messages = get_all_messages()
    all_messages = all_messages.map((message)=>{
        if(message.id == message_box_id){
            return {...message, messages: [...message.messages, {user_id: user_id, text: text}]}
        }
        return message
    })
    fs.writeFileSync(join(current_path, "messages.json"), JSON.stringify(all_messages, null, 2))
    res.status(201).send('a')
})

const port = process.env.port || 1231 
app.listen(port, ()=>{
    console.log('connected to: ', port);
    
})