const express = require('express');
const bodyParser = require('body-parser');
const { Template } = require('ejs');

const app = express();
var items = [];
let workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    var today = new Date();

    var option  = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US",option);

    // EJS Template use 
    res.render("List",{listTitle: "General", newItems: items});
});

app.post("/",(req,res)=> {
    var item = req.body.newItem;
    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});
app.get("/work",(req,res)=>{
    res.render("list", {listTitle:"Work List", newItems: workItems})
});
app.post("/work", (req,res) => {
    let work = req.body.newItem;
    workItems.push(work);
    res.redirect("/work");
});
app.listen(3000, ()=>{console.log("Server is running at 3000")});
