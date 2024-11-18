import fs from "fs"
import express from "express"
import path from "path"
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

function get_all_data(){
    // const data = fs.readFileSync("./src/local_server/users.json", "utf-8")
    const data = fs.readFileSync("./users.json", "utf-8")
    return JSON.parse(data)
}
function add_user(new_user, res){
    let all_data = get_all_data()
    
    all_data.push(new_user)
    
    fs.writeFileSync("./users.json", JSON.stringify(all_data))  
    res.send('finished')
}
function verify_user(user_i, res) {
    const all_users = get_all_data()
    let error_message = null
    const verified_user = all_users.find((user)=>{
        if (user.name == user_i.name && user.pwd == user_i.pwd){
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
// app.get("/", (req, res)=>{
//     get_all_data(req, res)
// })
app.post("/sign_up", (req, res)=>{
    const {username, email, password} = req.body
    add_user({name: username, email: email, pwd: password}, res)
})
app.post("/login", (req, res)=>{
    const {username, password} = req.body
    verify_user({name: username, pwd: password}, res)
})

app.listen(1231)