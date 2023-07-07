const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cors())



// DB config
const connection_url = "mongodb+srv://admin:tUggy2s0dcaAwDgY@cluster0.wjf87p4.mongodb.net/?retryWrites=true&w=majority"

mongoose
    .connect(connection_url)
    .catch((err) => console.log(err))

    

// Schema 
const postSchema = mongoose.Schema({
    title: String,
    description: String
})

// model
const Post = mongoose.model("post", postSchema);


// Routes ...
app.get("/", (req, res) => {
    res.send("express is HERE")
})

app.get("/posts", (req,res) => {
    Post
        .find()
        .then(items => res.json(items))
        .catch(err => console.log(err))
})


// Api
app.post("/create", (req,res) => {
    Post.create({
        title:req.body.title,
        description: req.body.description
    })
    .then(doc => console.log(doc))
    .catch(err =>console.log(err))
})

app.delete("/delete/:id", (req, res) => {
    Post.findByIdAndDelete({_id: req.params.id})
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err))
})

app.put("/update/:id", (req,res) => {
    Post.findByIdAndUpdate({_id: req.params.id }, {
        title: req.body.title,
        description: req.body.description,
    })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err))
})

// ???
app.listen(9000,() => {
    console.log("server is running")
});