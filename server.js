const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("path")
const { handleNamespace } = require("./nameSpace.js")
const port = process.env.PORT || 5500;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
    const file_path = path.join(process.cwd(), "/index.html");
    res.sendFile(file_path);
});


httpServer.listen(port, () => {
    console.log(`server live on http://localhost:${port}`);
});

handleNamespace(io)