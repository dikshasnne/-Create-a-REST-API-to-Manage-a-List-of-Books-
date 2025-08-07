const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let books =[
       {id: uuidv4(),
        title:"Ikigai",
        author:"Francesc Miralles" },

       {id: uuidv4(),
        title:"Atomic Habits",
        author:"James Clear" },

       {id: uuidv4(),
        title:"The Adventures of Huckleberry Finn",
        author:"Mark Twain"},
];

//index route
app.get("/books",(req ,res)=> {
     res.render("index.ejs",{books});
});

//create new route
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});


app.post("/books", (req, res) => {
    let { id, title, author } = req.body;
    books.push({ id: uuidv4(), title, author });
    res.redirect("/books");
});


//show route
app.get("/books/:id",(req,res)=>{
   let {id} =req.params;
   let book = books.find((b)=> b.id === id);
   res.render("show.ejs",{book});
});

//Patch route
app.patch("/books/:id",(req,res)=>{
    let { id } = req.params;
    let { title, author } = req.body;
    let book = books.find((b)=> b.id === id);
   if (book) {
         book.title = title;
         book.author = author;
        res.redirect("/books");
    } else {
        res.status(404).send(" Book not found");
    }

});

//Edit route
app.get("/books/:id/edit",(req,res)=>{
 let { id } = req.params;
  let book = books.find((b)=> b.id === id);
  res.render("edit.ejs",{ book });
});


//delete route
app.delete("/books/:id",(req,res)=>{
    let { id } = req.params;
     books = books.filter((b)=> b.id === id);
    res.redirect("/books");
});

app.listen(port,()=>{
    console.log("listening to port:3000");
});