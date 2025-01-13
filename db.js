import mongoose from "mongoose";
import dotenv from "dotenv"

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
const chat_boxSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: false},
    user1_id: { type: String, required: true},
    user2_id: { type: String, required: true },
    messages: [
        {
            user_id: { type: String, required: true },
            text: { type: String, required: true }
        }
    ]
})
const friend_requestSchema = new mongoose.Schema({
    user_s_id: { type: String, required: true},
    user_s_name: { type: String, required: true},
    user_r_id: { type: String, required: true },
})
const game_collection = mongoose.model("game", gameSchema)
const user_collection = mongoose.model("user", userSchema)
const comment_collection = mongoose.model("comment", commentSchema)
const chat_box_collection = mongoose.model("chat_box", chat_boxSchema)
const friend_request_collection = mongoose.model("friend_request", friend_requestSchema)

async function connect_db() {
    return await mongoose.connect(process.env.mongo_connection)
    .then(async ()=>{
        console.log('connected to db');
        return {
            game_collection: game_collection, 
            user_collection: user_collection,
            comment_collection: comment_collection,
            chat_box_collection: chat_box_collection,
            friend_request_collection: friend_request_collection
        }
    })
    .catch((err)=>{
        console.error('couldnt connect to db', err);
        throw err
    })
}
const db = await connect_db()
export default db