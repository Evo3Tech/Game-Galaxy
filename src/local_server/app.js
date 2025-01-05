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
    liked: [ { type: mongoose.Schema.Types.ObjectId} ],
    favorites: [{ type: String }],
    friends: [{ type: mongoose.Schema.Types.ObjectId }],
    avatar: { type: String},
    gamingPlatform: { type: String, default: '' },
    gamerTag: { type: String, default: '' },
    playstyle: { type: String, default: '' },
    streamingLink: {type: String, default: '' }
})
async function connect_db() {
    return await mongoose.connect(process.env.mongo_connection)
    .then(async ()=>{
        console.log('connected to db');
        const game_collection = mongoose.model("game", gameSchema)
        const user_collection = mongoose.model("user", userSchema)
        return {
            game_collection: game_collection, 
            user_collection: user_collection
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
function get_all_data(){
    const data = fs.readFileSync(join(current_path,"/users.json"), "utf-8")
    return JSON.parse(data)
}
function get_all_comments(){
    const data = fs.readFileSync(join(current_path,"comments.json"), "utf-8")
    return JSON.parse(data)
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
function add_like(username, comment_id, res) {
    let user = find_user(username)
    if(user.liked.includes(comment_id)){
        user.liked = user.liked.filter((liked_c)=>liked_c != comment_id)        
        decrease_like_count(comment_id)
        res.status(202).send('removed')
    }
    else{
        user.liked.push(comment_id)
        increase_like_count(comment_id)
        res.status(201).send('added')
    }
    update_user(user)
}
function increase_like_count(comment_id) {
    let all_comments = get_all_comments()
    all_comments = all_comments.map((comment)=>{
        if(comment.comment_id == comment_id){
            comment.likes += 1
        }
        return comment
    })
    fs.writeFileSync(join(current_path,"comments.json"), JSON.stringify(all_comments, null, 2))
}
function decrease_like_count(comment_id) {
    let all_comments = get_all_comments()
    all_comments = all_comments.map((comment)=>{
        if(comment.comment_id == comment_id){
            comment.likes -= 1
        }
        return comment
    })
    fs.writeFileSync(join(current_path,"comments.json"), JSON.stringify(all_comments, null, 2))
}
function find_user(username) {
    const all_users = get_all_data()
    return all_users.find((user)=>user.name == username)
}
function update_user(target_user) {
    
    let all_users = get_all_data()
    all_users = all_users.map((user)=>{
        if(user.name == target_user.name){
            user = target_user
        }
        return user
    })
    fs.writeFileSync(join(current_path,"users.json"), JSON.stringify(all_users, null, 2))
}
app.get("/all_Games", async(req, res)=>{
    const collections = await connect_db()
    console.log("load all games");
    
    const data = await collections.game_collection.find({})
    
    res.send(data)
})
app.get("/all_Games2", (req, res)=>{
    let data = fs.readFileSync(join(current_path,"data.json"),'utf-8')
    let games = JSON.parse(data)

    
    res.send(games)
})

app.post("/sign_up", async(req, res)=>{
    const { username, email, password } = req.body;

    const users = get_all_data();
    const existingUser = users.find((user) => user.name === username);

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
        console.log('user inserted');
    } catch (error) {
        console.log(error);
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


app.post("/changeAvatar",(req,res)=>{
    const {userid,srcimg}=req.body
    let users = get_all_data()
    users= users.map((user)=>{
        if(user.id== userid){
            user.avatar = srcimg
        }
        return user
    })
    fs.writeFileSync(join(current_path,"users.json"), JSON.stringify(users,null,2))  
    res.json({ message: 'finished' })
})

app.post("/test", (req, res)=>{
    // console.log(req.body.nom);
    // get_all_data()
    res.send('asd')
})

app.post('/add_comment', (req, res)=>{
    const {username, game_id ,comment_txt, user_id, user_img} = req.body
    add_comment(game_id, username, comment_txt, user_id, user_img, res)
})
function add_comment(game_id, username, comment_txt, user_id, user_img, res) {
    
    let all_comments = fs.readFileSync(join(current_path,"comments.json"), 'utf-8')
    all_comments = JSON.parse(all_comments)

    let new_comment = {
        comment_id : all_comments.length,
        user_id : user_id,
        game_id : game_id,
        writer : username,
        text : comment_txt,
        likes : 0,
        user_img : user_img
    }
    all_comments.push(new_comment)
    fs.writeFileSync(join(current_path,"comments.json"), JSON.stringify(all_comments, null, 2))
    res.send('comment added')
}
app.post('/all_comments', (req, res)=>{
    let all_comments = fs.readFileSync(join(current_path,"comments.json"), 'utf-8')
    all_comments = JSON.parse(all_comments)

    const {game_id} = req.body
    let games_comments = all_comments.filter((comment)=>comment.game_id == game_id)
    games_comments = JSON.stringify(games_comments)
    res.send(games_comments)
})
app.get("/comments", (req, res)=>{
    let data = fs.readFileSync(join(current_path,"comments.json"),'utf-8')
    let games = JSON.parse(data)
    res.send(games)
})
app.post('/add_like', (req, res)=>{
    const {name, comment_id} = req.body
    try {
        add_like(name, comment_id, res)
    } catch (error) {
        res.status(512).send(error.message)
    }

})
function add_rm_friend(user_id, target_u_id,target_friend_name, res) {
    
    let all_users = get_all_data()
    all_users = all_users.map((user)=>{
        if(user.id == user_id){
            if(user.friends.some(fr=>fr.id == target_u_id)){
                res.status(201)
                return {...user, friends: [...user.friends.filter((fr)=>fr.id != target_u_id)]}
            }
            create_message_box(user_id, target_u_id)
            res.status(200)
            return {...user, friends: [...user.friends, {id: target_u_id, name: target_friend_name}]}
        }
        return user
    })
    fs.writeFileSync(join(current_path, "users.json"), JSON.stringify(all_users, null, 2))
}
app.post('/friends/add', (req, res)=>{
    const {user_id, target_friend_id, target_friend_name} = req.body
    
    add_rm_friend(user_id, target_friend_id, target_friend_name, res)
    
    res.send('added')
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

app.post('/update_user', (req, res) => {
    const { user_id, updated_data } = req.body;

    let users = get_all_data();
    let user = users.find(user => user.id === user_id);

    if (user) {
        user = { ...user, ...updated_data };  
        update_user(user); 
        res.status(200).json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

const port = process.env.port || 1231 
app.listen(port, ()=>{
    console.log('connected to: ', port);
    
})