const express = require('express');
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose")
const homeRout = require("./routes/home");
const cardRout = require("./routes/card");
const addRout = require("./routes/add");
const coursesRout = require("./routes/courses");
const User = require("./models/user")

const app = express();

const hbs = exphbs.create({
    defaultLayoult: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
    try{
        const user = await User.findById('5da9a39ec4089f03c1212813');
        req.user = user;
        next();
    }catch (e) {
        console.log(e)
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use(("/"),homeRout);
app.use(("/add"),addRout);
app.use(("/card"),cardRout);
app.use(("/courses"),coursesRout);


const PORT = process.env.port || 3000;

async function start() {

    try{
        const url = 'mongodb+srv://nova:G4RAJGDDtboIBH2s@cluster0-7xjjv.mongodb.net/shop';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        const candidate = await User.findOne();
        if(!candidate) {
            const user = new User({
                email: 'kachouse@gmail.com',
                name: 'Victor',
                cart: {items: []}
            });

            await user.save();
        }

        app.listen(PORT, () => {
            console.log("Server is running on port ", PORT);
        });
    }catch(e){
        console.log(e)
    }


}

start();