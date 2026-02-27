import express from "express";

export const routerV21 = express.Router();

// telling the client that these routes aren't implemented yet
// with the dedicated 501 error response
function sendNotImplemented(req, res){
    res.sendStatus(501);
}

routerV21.get("/users", sendNotImplemented);
routerV21.get("/books", sendNotImplemented);
   