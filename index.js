const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
app.use(bodyparser.urlencoded({extended:true}))
let PORT = process.env.PORT
let URI = process.env.URI
app.set("view engine", "ejs")
mongoose.connect(URI)
.then((result)=>{
    console.log('mongoose has started');
})
.catch((err)=>{
    console.log(err);
})
const testSchema = new mongoose.Schema({
    firstname:{type: String, require:true },
    lastname:{type: String, require:true },
    email:{type: String, require:true, unique:true },
    password:{type: String, require:true },
})

let testModel = mongoose.model("test", testSchema)

app.get('/signup', (req,res)=>{
    console.log(req.body);
    testModel.find()
    .then((result)=>{
        console.log(result);
        res.render('signup', {userDetails: result})
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post('/user', (req, res)=>{
    console.log(req.body);
   let form = new testModel(req.body);
   form.save()  
   .then((result)=>{
    console.log('for submitted successfully');
    res.redirect("signup")
   })
   .catch((err)=>{
    console.log(err);
   })
})
app.post("/delete", (req,res)=>{
    testModel.deleteOne({items:req.body.newItem})
    .then((result)=>{
        console.log(result);
        res.redirect("signup")
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post('/edit', (req,res)=>{
    console.log(req.body);
    testModel.findOne({items:req.body.newItem})
    .then((result)=>{
        if (result) {
            res.render("edituser", {info:result})
            console.log(result);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})



app.post('/update', (req,res)=>{
    console.log(req.body);
    testModel.updateOne({items:req.body.items}, req.body)
    .then((result)=>{
        if (result) {
            console.log(result);
            res.redirect("/signup")
            
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})


app.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
})