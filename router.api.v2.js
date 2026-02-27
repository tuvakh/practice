import express from "express";
import books from "./books.json" with {type: "json"};


export const routerV2 = express.Router();

const users = [
    {
        uid: 1,
        name: "Tuva",
        favoriteFruit: "Mango"
    },
    {
        uid: 2,
        name: "Carlos",
        favoriteFruit: "Apple"
    }
];

// this route will be accessible on /[prefix given when it is mounted]/users
// e.g. if we mount this Router on /api, it will be "/api/users"
routerV2.get("/users", (req, res)=> {
    res.json(users);
    // return all users
});

routerV2.get("/books", (req, res)=> {
    const processedBooks = books.map(book=>{
        return {...book, randomNumber: Math.round(Math.random() * 1000)};
    });
    res.json(processedBooks);
    // return all users
});