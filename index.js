const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");
const homeRout = require("./routes/home");
const addRout = require("./routes/add");
const coursesRout = require("./routes/courses");
const CardRout = require("./routes/card");

const app = express();

const hbs = exphbs.create({
    defaultLayoult: "main",
    extname: "hbs"
});
 
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(("/"), homeRout);
app.use(("/add"), addRout);
app.use(("/courses"), coursesRout);
app.use(("/card"), CardRout);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});