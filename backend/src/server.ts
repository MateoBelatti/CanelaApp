import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initModels } from './config/initModels';

class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json({limit: '150mb'}));
        // Logger HTTP
        this.app.use(morgan('dev'));
        // Log simple request info for debugging
        this.app.use((req, _res, next) => {
            console.log('REQ:', req.method, req.originalUrl);
            next();
        });
        //cors
        this.app.use( cors(
            {
                origin: 'http://localhost:5173', // Vite
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            }
        ));
    }
    routes(){
        //this.app.use("/rutas", importacionDeRutas);
    }
    async start(callback: () => void) {
        // metodo para conectar con DB
        await initModels();
        
        this.app.listen(this.port, callback);
    }
}
export default Server;