const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
    defaultLayoult: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs")
app.set("views", "views")

app.get('/', (req, res) => {
res.status(200)
res.render('index')

});


const PORT = process.env.port || 3000

app.get("/about", (req, res) => {
   res.render("about")
});





app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});