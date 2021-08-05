const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
require('./models/user')
require('./models/post')

const mongoURI = "mongodb+srv://Instagram:7V7nAyWirwjYF4BL@cluster0.7ryyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.connection.on("connected", ()=>{
    console.log("connected to mongo wow !!");
})
mongoose.connection.on("error", (err) =>{
    console.log("error connecting", err);
})

// const customMiddleware = (req, res, next) =>{
//     console.log("Middleware executed")
//     next();
// }

// app.use(customMiddleware);

// app.get("/", (req,res) =>{
//     res.send("Hello");
// })

app.listen(PORT, ()=>{
    console.log("Server is running on ", PORT)
})