'use strict';

const express = require('express'),
route = express.Router();
let http = require('http');
let fs = require('fs');
const path = require("path");



//get user profile
route.get('/', (req, res)=>{
    fs.readFile(path.resolve(__dirname, "../public/statistic/d3.html"), null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            console.log("innnnn")
            res.write(data);
        }
        res.end();
    });
});


module.exports = route