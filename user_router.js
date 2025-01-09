import express from "express"
import { add_comment, add_like, add_rm_friend, change_image, get_messages, toggle_favorite, update_user, verify_user } from "./user.js";
import db from "./db.js";
import { add_comment_c, add_friend_c, add_like_c, change_img_c, get_messages_c, log_in, send_messages_c, sign_up, update_user_c } from "./user_controller.js";


const router = express.Router();
router.options('/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.VITE_SERVER_URL);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});
router.post("/login", log_in)
router.post("/sign_up", sign_up)
router.post("/favorite",async(req,res)=>{
    const {Username,Game}=req.body
    toggle_favorite(Username, Game.id, res)
})
router.post("/changeAvatar", change_img_c)
router.post('/update_user', update_user_c)
router.post('/friends/add', add_friend_c)
router.post('/add_comment', add_comment_c)
router.post('/messages', get_messages_c)
router.post('/messages/send', send_messages_c)
router.post('/add_like', add_like_c)

router.get("/all_Games", async(req, res)=>{
    try {
        const data = await db.game_collection.find({})
        res.send(data)
    } catch (error) {
        console.log(error);
        
    }
})
router.get("/comments", async (req, res)=>{
    const comments = await db.comment_collection.find({})
    res.json(comments)
})
export default router