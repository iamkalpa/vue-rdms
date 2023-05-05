// import express
import express from "express";
import dotenv from "dotenv/config";

import cookieParser  from "cookie-parser";
import sessionMiddleware from "./common/session.js";

//import MySQLStore from "express-mysql-session";

// import cors
import cors from "cors";
// import routes
import Router from "./routes/routes.js";
 
// init express
const app = express();
 
// use cors
app.use(cors());

// cookie parser middleware
app.use(cookieParser(process.env.SESSIONSECRET));

app.use(sessionMiddleware);
// use express json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use router
app.use(Router);

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
/*app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));*/
 
app.listen(5000, () => console.log('Server running at http://localhost:5000'));