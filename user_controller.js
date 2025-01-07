import db from "./db.js";
import { add_comment, add_like, add_rm_friend, change_image, get_messages, get_user, update_user, verify_user } from "./user.js";

export async function sign_up(req, res){
    const { username, email, password } = req.body;
    try {
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
        try {
            await db.user_collection.insertMany(new_user)
            res.status(200).send(new_user)
        } catch (error) {
            console.log(error);
            res.status(500).send(new_user)
        }
    } catch (error) {
        console.error(error);
    }


}
export async function log_in(req, res){
    const {username, password} = req.body
    await verify_user({name: username, pwd: password}, res)
}

export async function change_img_c(req,res){
    const {userid,srcimg}=req.body
    await change_image(userid, srcimg, res)
}

export async function update_user_c(req, res) {
    const { user_id, updated_data } = req.body;
    const user = await db.user_collection.findOne({id: user_id})
    if (user) {        
        await update_user(user, updated_data); 
        res.status(200).json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}

export async function add_friend_c(req, res){
    const {user_id, target_friend_id, target_friend_name} = req.body
    await add_rm_friend(user_id, target_friend_id, target_friend_name, res)
}
export async function add_comment_c(req, res){
    const {username, game_id ,comment_txt, user_id, user_img} = req.body
    await add_comment(game_id, username, comment_txt, user_id, user_img, res)
}
export async function get_messages_c(req,res){
    const {user_1, user_2} = req.body
    res.send(await get_messages(user_1, user_2))
}

export async function send_messages_c(req, res){
    const {user_id, text, message_box_id} = req.body
    await db.chat_box_collection.updateOne(
        {id: message_box_id}, 
        {$push: {messages: {user_id: user_id, text: text}}}
    );
    res.status(201).send('message sent')
}
export async function add_like_c(req, res){
    const {name, comment_id} = req.body
    try {
        await add_like(name, comment_id, res)
    } catch (error) {
        res.status(512).send(error.message)
    }
}