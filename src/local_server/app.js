import fs from "fs"
import express, { json } from "express"
import cors from 'cors';
import { doesNotMatch } from "assert";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import { log } from "util";

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const abs_path = fileURLToPath(import.meta.url)
const current_path = dirname(abs_path)
console.log(join(current_path,""));

function get_all_data(){
    // const data = fs.readFileSync("./src/local_server/users.json", "utf-8")
    const data = fs.readFileSync(join(current_path,"/users.json"), "utf-8")

    
    return JSON.parse(data)
}
function get_all_comments(){
    const data = fs.readFileSync(join(current_path,"comments.json"), "utf-8")
    return JSON.parse(data)
}
function add_user(new_user, res){
    let all_data = get_all_data()
    // slack
    // docker
    all_data.push(new_user)
    fs.writeFileSync(join(current_path,"users.json"), JSON.stringify(all_data, null, 2))  
    res.send('finished')
}
function verify_user(user_i, res) {
    const all_users = get_all_data()
    let error_message = null
    const verified_user = all_users.find((user)=>{
        if (user.name == user_i.name && user.pwd == user_i.pwd){
            error_message = null
            return true
        }
        else if(user.name == user_i.name && user.pwd != user_i.pwd){
            error_message = "wrong password"
            return true
        }
        else{
            error_message = "user not found"
            return false
        }
    })
    if(error_message == null && verified_user){
        res.send(JSON.stringify(verified_user))
    }
    else if(error_message == "wrong password" && verified_user){
        res.status(401).send(error_message)
    }
    else if (error_message == "user not found"){
        res.status(404).send(error_message)
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
app.get("/all_Games", (req, res)=>{
    let data = fs.readFileSync(join(current_path,"data.json"),'utf-8')
    let games = JSON.parse(data)

    
    res.send(games)

})

app.post("/sign_up", (req, res)=>{
    const {username, email, password} = req.body


    const new_user = {
        id: `${username}--${email}`,
        name: username, 
        email: email, 
        pwd: password,
        liked: [],
        favorites: [],
        friends: []
    }
    add_user(new_user, res)
})
app.post("/login", (req, res)=>{
    const {username, password} = req.body
    verify_user({name: username, pwd: password}, res)
})
app.post("/favorite",(req,res)=>{
    let status
    const {Username,Game}=req.body
    let users = get_all_data()
    let Found = false;
    users= users.map((user)=>{
        if(user.name== Username){
           if(!user.favorites.includes(Game.id)){
                user.favorites.push(Game.id);   
                status = 201  
            }else{
                user.favorites=user.favorites.filter((g)=>g!=Game.id)
                console.log(user.favorites);   
                status = 202
            }
            Found = true; 
        }
        return user
    })
    if(Found){
        fs.writeFileSync(join(current_path,"users.json"), JSON.stringify(users,null,2))  
        res.status(status).json({ message: 'finished' })
    }else{
        res.status(404).json({ error: 'User not found' });
    }
    
})


app.post("/test", (req, res)=>{
    // console.log(req.body.nom);
    // get_all_data()
    res.send('asd')
})

app.post('/add_comment', (req, res)=>{
    const {username, game_id ,comment_txt, user_id} = req.body
    add_comment(game_id, username, comment_txt, user_id, res)
})
function add_comment(game_id, username, comment_txt, user_id, res) {
    
    let all_comments = fs.readFileSync(join(current_path,"comments.json"), 'utf-8')
    all_comments = JSON.parse(all_comments)

    let new_comment = {
        comment_id : all_comments.length,
        user_id : user_id,
        game_id : game_id,
        writer : username,
        text : comment_txt,
        likes : 0
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
app.post('/add_like', (req, res)=>{
    const {name, comment_id} = req.body
    try {
        add_like(name, comment_id, res)
    } catch (error) {
        res.status(512).send(error.message)
    }

})
app.get('/del', (req, res)=>{
    let games_names = [
        "Bad End Theater",
        "Sengoku Rance",
        "Caves (Roguelike)",
        "Linelight",
        "Polity",
        "Undertale Yellow",
        "Hiveswap: Act 1",
        "Fate/Hollow Ataraxia",
        "Burnhouse Lane",
        "NFUT Cards",
        "Ghost Trick: Phantom Detective",
        "Auf Wiedersehen Monty",
        "Steins;Gate",
        "Sengoku Rance",
        "Space Station 13",
        "Kindred Spirits on the Roof",
        "Space Quest IV: Roger Wilco and the Time Rippers",
        "Chrono Trigger",
        "SOCOM II: U.S. Navy SEALs",
        "Shin Megami Tensei V: Vengeance",
        "The Legend of Sword and Fairy",
        "Mega Man ZX",
        "Tetris Effect: Connected",
        "KORG Gadget",
        "Of Mice and Sand: Revised",
        "Little Town Hero",
        "Chocobo's Mystery Dungeon Every Buddy!",
        "Neko Atsume: Kitty Collector",
        "Final Fantasy: Record Keeper",
        "Solitaire 3D",
        "Xuan Yuan Sword: The Gate of Firmament",
        "Defender's Quest: Valley of the Forgotten DX",
        "Projekt",
        "Chrono Trigger",
        "Disney Emoji Blitz",
        "The Mystery of Blackthorn Castle",
        "Donuts Drift",
        "Golf Zero",
        "KleptoCats 2",
        "Mowy Lawn",
        "Will Hero",
        "Respawnables: Special Forces",
        "Flip the Gun - Simulator Game",
        "Gotcha Racing 2nd",
        "Psyvariar Delta",
        "The Stretchers",
        "Tiny Metal: Full Metal Rumble",
        "Fire Emblem: Shadow Dragon and the Blade of Light",
        "Minishoot' Adventures",
        "Dune II: The Building of a Dynasty",
        "Utawarerumono: Mask of Truth",
        "Mother 3",
        "Harvest Moon 64",
        "Xenosaga Episode III: Also sprach Zarathustra",
        "Phoenix Wright: Ace Attorney",
        "The Legend of Zelda: The Wind Waker HD",
        "Rally-X",
        "Etrian Odyssey 2 Untold: The Fafnir Knight",
        "The Stanley Parable: Ultra Deluxe",
        "The Legend of Heroes: Trails to Azure",
        "Fire Emblem: The Sacred Stones",
        "The Legend of Zelda: Majora's Mask 3D",
        "You and Me and Her: A Love Story",
        "NieR: Automata",
        "Clannad",
        "7th Dragon III Code: VFD",
        "Elasto Mania",
        "Cosmic Spacehead",
        "Kingdom Hearts II Final Mix",
        "Dance Dance Revolution Extreme",
        "Suikoden II",
        "Persona 3",
        "Tiny Rogues",
        "Stream Pairs",
        "The Legend of Zelda: Ocarina of Time",
        "DDraceNetwork",
        "Alley Catz Bowling",
        "Zaos",
        "Super Mario World",
        "Wandersong",
        "The Legend of Zelda: A Link to the Past",
        "13 Sentinels: Aegis Rim",
        "Paper Mario: The Thousand-Year Door",
        "Bustafellows",
        "Resonite",
        "Goblin Sword",
        "Umurangi Generation",
        "Metaphor: ReFantazio",
        "MLB Power Pros 2008",
        "Voices of the Void",
        "Star Realms",
        "Final Fantasy VII",
        "Doodle Date",
        "Disco Elysium",
        "Astro Bot: Rescue Mission",
        "Eiyuden Chronicle: Hundred Heroes",
        "The Cat Lady",
        "Super Robot Taisen W",
        "Rune Evolution",
        "Metal Gear Solid 3: Snake Eater - HD Edition",
        "Multi-Users in Middle-earth",
        "Epiko Regal",
        "Steambot Chronicles",
        "Silent Hill 2: Restless Dreams",
        "Neon Space",
        "The Binding of Isaac: Repentance",
        "Streets of Rage Remake",
        "Doodle Date",
        "Master of Orion II: Battle at Antares",
        "Fate/Grand Order",
        "Ninja Gaiden Black",
        "Space Rangers 2: Dominators",
        "Discworld Noir",
        "Mega Man ZX Advent",
        "Melty Blood Act Cadenza Ver. B",
        "Sunflower Land",
        "Venture Kid",
        "Doom",
        "Venture Kid",
        "Omori",
        "Starsector",
        "Gloam",
        "Sensible World of Soccer",
        "Faith",
        "Lunar: Eternal Blue",
        "Lisa: The Painful",
        "Half-Life 2",
        "Lethal League Blaze",
        "King of the Castle",
        "Hrot",
        "Lunar: Eternal Blue",
        "The Great Ace Attorney: Adventures",
        "SOCOM: US Navy SEALs",
        "Shin Megami Tensei: Strange Journey",
        "Raw Danger!",
        "Pac-Man: Championship Edition DX",
        "Melty Blood Act Cadenza Ver. B",
        "Gloam",
        "Persona 5",
        "Castlevania: Symphony of the Night",
        "Astro Bot",
        "Rento Fortune Monolit",
        "Leisure Suit Larry: Wet Dreams Dry Twice",
        "AI: The Somnium Files - Special Agent Edition",
        "Neonwall",
        "The Great Ace Attorney 2: Resolve",
        "Catan Universe",
        "Castlevania: Symphony of the Night",
        "ESPN NFL 2K5",
        "Grindstone",
        "Epic Seven",
        "Disco Elysium: The Final Cut",
        "Atom RPG",
        "Pathologic 2",
        "Population: One",
        "Fuga: Melodies of Steel 2",
        "Indiana Jones and the Fate of Atlantis",
        "Sonic the Hedgehog 2",
        "Faraway 2: Jungle Escape",
        "Persona 5 Royal",
        "Super Bomberman 5",
        "Super Bomberman 5",
        "PlayM2M",
        "Metroid Prime",
        "Aquaria",
        "Dragon Quest VIII: Journey of the Cursed King",
        "Persona 5 Royal",
        "Pokémon SoulSilver Version",
        "Ultima Online",
        "System Shock",
        "Star Wars: Knights of the Old Republic",
        "Anstoss 3",
        "Mahjong Soul",
        "Mystery Case Files: Dire Grove",
        "Mahjong Soul",
        "Persona 4 Golden",
        "Fuga: Melodies of Steel",
        "Superfighters Deluxe",
        "Xenoblade Chronicles 2",
        "Ruthnar Online",
        "Priston Tale"
    ]

    let data_files = fs.readFileSync(join(current_path,"data copy.json"), 'utf-8')

    data_files = JSON.parse(data_files)

    let filtered_d = data_files.map((g)=>{
        if(!games_names.includes(g.name)){
            return g
        }

    })

    filtered_d = filtered_d.filter((g)=>g!=null)

    fs.writeFileSync(join(current_path,"data.json"), JSON.stringify(filtered_d, null, 2))
    res.send('asd')

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
app.listen(1231)