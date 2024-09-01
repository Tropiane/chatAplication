import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import __dirname from './utils.js';

const app = express();

const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const io = new Server(server);


app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/chat", (req, res) => {
    res.render("home");
})

const messages = [];

io.on('connection', socketClient => {
    console.log(`user connected: ${socketClient.id}`);

    socketClient.on("message", data=>{
        messages.push(data);
        io.emit("messages",messages);
    })

    socketClient.on("authenticated", data=>{
        console.log(`${data} está listo para chatear`);
        socketClient.emit("messages",messages);
        socketClient.broadcast.emit("authenticated",data);
    })

    socketClient.on("disconnect", () => {
        console.log("user disconnected");
    })
})
