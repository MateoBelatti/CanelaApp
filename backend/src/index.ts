import Server from "./server.js";
import {config} from 'dotenv';

config();

const port : number = Number(process.env.PORTEXPRESS) || 3000;

const server = new Server(port);

server.start(()=>{
    console.log("express on port 3000");
    
})