const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine", "hbs");

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.url} ${req.method}`;

    console.log(log);
    fs.appendFile("server.log", log+ "\n", (err)=>{
        if(err){
            console.log("Unable to write to log file", err);
        }
    });
    next();
});
// app.use((req,res,next)=>{
//     res.render("maintence.hbs");
// });
app.use(express.static(__dirname+ "/public"));

hbs.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt", (text)=>{
    return text.toUpperCase();
});

app.get("/", (req, res)=>{
    res.render("home.hbs",{
        pageTitle: "Home Page",
        tekst: "Dobrodosli na pocetnu stranicu",
    });
});

app.get("/about", (req,res)=>{
    res.render("home.hbs",{
        pageTitle: "About Page",
        tekst: "Tekst stranice About",
    });
});

app.get("/bad", (req,res)=>{
    res.render("home.hbs",{
        pageTitle: "404 Page",
        tekst: "Couldn't find a page you were looking for",
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log("Server is up and running on port 3000.");
});