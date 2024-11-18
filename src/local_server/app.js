import fs from "fs"
import express from "express"
import path from "path"
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

function get_all_data(){
    const data = fs.readFileSync("./users.json", "utf-8")
    return JSON.parse(data)
}
function add_user(new_user, res){
    let all_data = get_all_data()
    
    all_data.push(new_user)
    
    fs.writeFileSync("./users.json", JSON.stringify(all_data))  
    res.send('finished')
}
// app.get("/", (req, res)=>{
//     get_all_data(req, res)
// })
app.post("/sign_up", (req, res)=>{
    const {username, email, password} = req.body
    add_user({name: username, email: email, pwd: password}, res)
})

app.listen(1231)