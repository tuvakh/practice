import express from "express";
import { routerV1 } from "./router.api.v1.js";
import { routerV2 } from "./router.api.v2.js";
import { routerV21 } from "./router.api.v2.1.js";
import cors from "cors";

const PORT = 3456;

// creating an express app
const app = express();

// attaching cors middlewate
const allowedOrigins = {
    prod: ["http://our.business.site"],
    dev: ["http://localhost:10000"],
    stage: [
        "http://staging.site", 
        "http://some.other.staging.site", 
        "http://i.run.out.of.ideas.site"
    ]
};

const corsSettings = {
    origin: (origin, cb)=>{
        switch(process.env.NODE_ENV){
            case "production":
                if(allowedOrigins.prod.includes(origin)){
                    return cb(null, true);
                }
                break;
            case "stage":
                if(allowedOrigins.stage.includes(origin)){
                    return cb(null, true);
                }
                break;
            case "dev":
                if(allowedOrigins.dev.includes(origin)){
                    return cb(null, true);
                }
                break;
            default:
                console.error("UNKNOWN RUNNING environment: ", process.env.NODE_ENV);
        }
        return cb(new Error("This origin isn't allowed, " + origin));
    }
};
app.use(cors(corsSettings));

// mouting routers 
app.use("/api/v1", routerV1);
app.use("/api/v2", routerV2);
app.use("/api/v2.1", routerV21);

// launching our app
app.listen(3456, ()=> {
    console.log("The library REST API app is listening: ", PORT)
})