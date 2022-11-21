import app from "./app";
import fs from "fs";
import http from "http";
import https from "https";

import "./database";

const certificate = fs.readFileSync(
    "./cnshelados.tech/certificate.crt",
    "utf8",
    (err) => {
        if (err) console.log(err);
    }
);

const privateKey = fs.readFileSync(
    "./cnshelados.tech/private.key",
    "utf8",
    (err) => {
        if (err) console.log(err);
    }
);

const credentials = {
    key: privateKey,
    cert: certificate,
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
httpsServer.listen(3001);

console.log("Http server listen port 3000");
console.log("Https server listen port 3001");

//app.listen(3000);

//console.log("Server listen on port:", 3000);
