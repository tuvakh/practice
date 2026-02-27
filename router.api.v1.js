import express from "express";
import books from "./books.json" with {type: "json"}

export const routerV1 = express.Router();
const users = [
    {
        uid: 1,
        name: "Joe"
    },
    {
        uid: 2,
        name: "Carlos"
    },{
        uid: 3,
        name: "Ben"
    },
];
// This route will be accessible on /[prefix given when it is mounted]/users
// e.g if we mount this Router on /api it will be /api/users
routerV1.get("/books", (req, res)=>{
    // CHecking for acceptable types (for the client)
    // Return all books ig
    const acceptableFormatOfRes = req.accepts(["json", "text"]);
    let booksAsText;
    // a bit switch statement to have different logic for different acceptable types
    switch (acceptableFormatOfRes){
        case "json":
            // If client wants Json we send JSON
            res.json(books);
            break;
        case "text":
            // If client wants text we transform book list into text
           booksAsText = books.map(book=>`title: ${book.title} author: ${book.author}`)
           .join("\n"); // Joins all strings using the newline character to separate different lines
           res.send(booksAsText);
           break
        default:
            res.status(404);
    }
});

routerV1.get("/users", (req, res)=>{
    // Return all books ig
    res.json(users);
});
routerV1.use("/",(req, res)=>{
    // All non matched reqs will be processed here
    // Which menas that we handle all 404 cases here
    res.status(404).json({
        msg: `Router V1 says that this path (${req.path}) doesn't exist`
    });
});