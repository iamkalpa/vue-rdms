//import express from "express";
import session from "express-session";
import FileStoreFactory from 'session-file-store';

const FileStore = FileStoreFactory(session);
import dotenv from "dotenv/config";

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
const sessionMiddleware = session({
    secret: process.env.SESSION_KEY,
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: false,
    store: new FileStore({
        // Configure the session file store options
        path: './sessions' // Set the file store directory
      })
});
export default sessionMiddleware;
// cookie parser middleware
//app.use(cookieParser());