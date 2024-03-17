"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '2024';
var app = (0, express_1.default)();
app.use('/', function (req, res, next) {
    res.send('Hi you are in wrong window').status(200);
});
app.listen(port, function () {
    console.log("App is running on Port ".concat(port));
});
