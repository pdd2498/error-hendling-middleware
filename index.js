const express = require("express");
const app = express();
const fs = require("node:fs");


function isSpecialCharacter(char) {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(char);
}

const erreorHandel = (err , req , res , next)=>{
    console.error(err);
    if(err == 1){
    res.status(500).json({
        success:"fails",
        message:"Ensure that the first letter of both the first name and last name is capitalized."
    })}
    else if(err == 2 ){
        res.status(500).json({
            success:"fails",
            message:"Check the phone number"
        })
    }
    else if(err == 3){
        res.status(500).json({
            success:"fails",
            message:"Check the Email"
        })
    }
    else if(err == 4){
        res.status(500).json({
            success:"fails",
            message:"Check the password"
        })
    }
}

const chackName = (req , res , next)=>{

    const data = req.body;
    const name = data.name.split(" ");
    const email = data.email;

    name.forEach((e)=>{
        if (e.charAt(0) !== e.charAt(0).toUpperCase()){
            next(1);
        }
    })
    next()
}

const chackNumber = (req , res , next)=>{
    let number = req.body.number;
    if(number.length != 10){
        next(2)
    }
    next();
}

const chackEmail = (req , res , next)=>{
    const email = req.body.email.split("");
    email.forEach((e)=>{
        if(e == '@'){
            next();
        }
    })
    next(3);
}

const chackPassword = (req ,res ,next)=>{

    const password = req.body.password.split("");
    console.log(password);
    if(password.length < 8)next(4);
    let up = false;
    let num = false;
    let es = false;
    password.forEach(e=>{
        if(e == e.toUpperCase())up = true;
        if(Number(e)>=0 && Number(e)<=9)num = true;
        if(isSpecialCharacter(e))es = true;
    })
    if(up && num && es) next();
    else next(4)

}

app.use(express.json())

app.use(chackName)
app.use(chackNumber);
app.use(chackEmail);
app.use(chackPassword)

app.use(erreorHandel)

app.post("/user/info", (req, res) => {
    res.json({
        success: "true",
        data : req.body
    });
});

app.listen(8080, () => console.log("preyesh dhar diwan"));
