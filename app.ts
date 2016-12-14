import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as http from "http";

import index = require("./routes/index");
import config = require("./config");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.set("port", config.port);

let port = config.port;
let server = http.createServer(app);
server.listen(port);

server.on("error", (err: any ) => {
    if (err.syscall !== "listen") {
        throw err;
    }

    switch (err.code) {
        case "EACCES":
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;
    }
});

server.on("listening", () => {
    let addr = server.address();

    console.log(`Listening on ${port}`);
});