const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
require('./models/user')
require('./models/post')

const {mongoURI} = require('./config/keys')

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

if (process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log("Server is running on ", PORT)
})