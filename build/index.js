"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("- \u001B[1m\u001B[32mServer listening on port:\u001B[0m \u001B[1m\u001B[35m" + port + "\u001B[0m");
});
