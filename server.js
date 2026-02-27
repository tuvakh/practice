import express from "express";
import { routerV1 } from "./router.api.v1.js";
import { routerV2 } from "./router.api.v2.js";
import { routerV21 } from "./router.api.v2.1.js";

const PORT = 3456;

// creating an express app
const app = express();


// mouting routers 
app.use("/api/v1", routerV1);
app.use("/api/v2", routerV2);
app.use("/api/v2.1", routerV21);

// launching our app
app.listen(3456, ()=> {
    console.log("The library REST API app is listening: ", PORT)
})