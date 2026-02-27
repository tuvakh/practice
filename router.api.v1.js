import express from "express";
import books from "./books.json" with {type: "json"};

export const routerV1 = express.Router();

const users = [
    {
        uid: 1,
        name: "Tuva"
    },
    {
        uid: 2,
        name: "Carlos"
    }
];

// this route will be accessible on /[prefix given when it is mounted]/users
// e.g. if we mount this Router on /api, it will be "/api/users"
routerV1.get("/users", (req, res)=> {
    res.json(users);
    // return all users
});

routerV1.get("/books", (req, res)=> {
    res.json(books);
    // return all users
});

// the 'global' Not Found handler has to come last
// it will run only if the incoming request was not matched to any other handler above it
routerV1.use("/", (req, res)=> {
    // all non-matched requests will be processed here
    // which means that we handle all 404 cases here
    res.status(404).json({
        msg: `Router v1 says that this path (${req.path}) doesn't exist on this server`
    });
});