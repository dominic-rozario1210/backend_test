import express from "express"
import dotenv from "dotenv"
import cors from "cors"


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

let users = [
    {
        id:1,
        name:"dominic",
        email:"dom123@gmail.com"
    },
    {
        id:2,
        name:"rozario",
        email:"roza23@gmail.com"
    }
]

app.get("/users",(req,res) => {
    res.json({
        success:true,
        data:users
    })
})

app.get("/users/:id" ,(req,res) => {
    const id = Number(req.params.id)
    const user = users.find((user) =>(user.id === id))

    if(!user){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }
    res.json({
        success:true,
        data:user
    })
})  

app.post("/users",(req,res) => {
    const{name,email,password} = req.body;

    const newUsers = {
        id:users.length + 1,
        name,
        email,
        password
    }
    users.push(newUsers)

    res.status(201).json({
        success:true,
        message:"user created successfully",
        data:newUsers
    })
})

app.put("/users/:id",(req,res) => {
    const id = Number(req.params.id);
    const {name,email} = req.body;

    const user = users.find((user) => user.id === id)

    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    user.name= name;
    user.email=email;

    res.json({
        success:true,
        message:"user updated successfully",
        data:user
    })
})

app.delete("/users/:id",(req,res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => (user.id === id))

    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    users= users.filter((user) => (user.id !== id))

    res.json({
        success:true,
        message:"user deleted successfully",
        data:users
    })
})

app.listen(process.env.PORT,() => {
    console.log("app started successfully")
})