import db from "./db.js";

export async function get_user(u_name='') {
    const users = db.user_collection
    if(u_name != ''){
        return await users.findOne({name : u_name})
    }
    return await users.find({})
}
export async function toggle_favorite(u_name, game_id, res) {
    try {
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

export async function change_image(user_id, srcimg, res) {
    try {
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
export async function verify_user(user_i, res) {
    try {
        const search_u = await db.user_collection.findOne({name: user_i.name})
        if(search_u){
            const verified_user = search_u.name == user_i.name && search_u.pwd == user_i.pwd
            if(verified_user){
                console.log('user found')
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
export async function add_rm_friend(user_id, target_u_id,target_friend_name, res) {
    console.log("==");
    console.log("user_id:" , user_id);
    console.log("user_id:" , target_friend_name);
    console.log("==");
    const frieds_already = await db.user_collection.find({$and: [{"id": user_id}, {"friends.name": target_friend_name}]})
    console.error("friends ? ?:  ", frieds_already);
    
    try {
        const current_user = await db.user_collection.findOne({id: user_id})
        if(frieds_already.length){
            const target_friend = {id: target_u_id, name: target_friend_name}
            await db.user_collection.updateOne(
                {id: user_id},
                {$pull: {friends: target_friend}}
            )
            res.status(201).send('friend removed')
        }
        else{
            const new_friend = {id: target_u_id, name: target_friend_name}
            await db.user_collection.updateOne(
                {id: user_id},
                {$push: {"friends": new_friend}}
            )
            const chat_box_exists = await db.chat_box_collection.find({$or: [{id: user_id + "*" +target_u_id}, {id: target_u_id + "*" + user_id }]})
            
            if(!chat_box_exists.length){
                
                await db.chat_box_collection.insertMany([
                    {
                        id: user_id + "*" +target_u_id,
                        user1_id: user_id,
                        user2_id: target_u_id,
                        messages: []
                    }
                ]
                )
            }
            res.status(200).send('friend added')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
export async function add_like(username, comment_id, res) {
    
    let user = await get_user(username)
    
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
export async function increase_like_count(comment_id) {
    await db.comment_collection.updateOne({comment_id}, {$inc: {likes: 1}})
}
export async function decrease_like_count(comment_id) {
    await db.comment_collection.updateOne({comment_id}, {$inc: {likes: -1}})
}
export async function update_user(target_user, updated_data) {    
    await db.user_collection.updateOne({id: target_user.id}, {$set: updated_data})
}

export async function get_messages(user1_id, user2_id) {
    let target_msg = {
        id1: user1_id + "*" + user2_id,
        id2: user2_id + "*" + user1_id
    }
    return await db.chat_box_collection.findOne({$or: [{id: target_msg.id1}, {id: target_msg.id2}]})
}
export async function add_comment(game_id, username, comment_txt, user_id, user_img, res) {
    try {
        const comments_c = db.comment_collection      
        let last_comment = await comments_c.find({}, {comment_id: 1}).sort({comment_id: -1}).limit(1)        
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