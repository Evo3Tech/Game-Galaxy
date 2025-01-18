import express from "express"
import { add_comment, add_like, add_rm_friend, change_image, get_messages, get_user, get_user_info, toggle_favorite, update_user, verify_user } from "./user.js";
import db from "./db.js";
import { add_comment_c, add_friend_c, add_like_c, auth, change_img_c, get_friend_request_c, get_messages_c, log_in, logout, request_friend_c, send_messages_c, sign_up, update_user_c } from "./user_controller.js";
import cookieParser from "cookie-parser";


const router = express.Router();
router.use(cookieParser())
router.options('/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.VITE_SERVER_URL);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});
router.post("/login",log_in)
router.post("/logout",logout)
router.post("/sign_up", sign_up)
router.post("/favorite",auth ,async(req,res)=>{
    const {Username,Game}=req.body
    toggle_favorite(Username, Game.id, res)
})

router.post("/user_info",auth , get_user_info)
router.post("/changeAvatar",auth ,change_img_c)
router.post('/update_user', auth ,update_user_c)
router.post('/friends/request', auth ,request_friend_c)
router.post('/friends', auth ,get_friend_request_c)
router.post('/friends/add', auth ,add_friend_c)
router.post('/add_comment', auth ,add_comment_c)
router.post('/messages', auth ,get_messages_c)
router.post('/messages/send', auth ,send_messages_c)
router.post('/add_like', auth ,add_like_c)
router.get('/check_user', auth,async (req, res)=>{
    console.log("check route");
    try {
        const user_data = req.user_data
        res.json(user_data)
    } catch (error) {
        console.log(error);
        res.status(500).send("can't connect to server")
    }

})

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