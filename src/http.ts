import express from "express";
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes"

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
});

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html");
});

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
    console.log("Seja bem vindo!");

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

app.use(express.json());

app.use(routes);

export { http, io };
