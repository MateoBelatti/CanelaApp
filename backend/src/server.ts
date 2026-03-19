import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initModels } from './config/initModels';
import { errorHandler } from './middlewares/errorHandler.middleware';

//Importacion de rutas
import routerUsuario from './routes/usuario.routes';
import routeAuth from './routes/auth.routes';
import routerCategoria from './routes/categoria.routes';
import routerProducto from './routes/producto.routes';
import routerCarrito from './routes/carrito.routes';
import routerDetalleCarrito from './routes/detalleCarrito.routes';

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
        this.app.use(errorHandler);
    }
    routes(){
        this.app.use("/api/usuario", routerUsuario);
        this.app.use("/api", routeAuth);
        this.app.use("/api/categoria", routerCategoria);
        this.app.use("/api/producto", routerProducto);
        this.app.use("/api/carrito", routerCarrito);
        this.app.use("/api/detalleCarrito", routerDetalleCarrito);
        //this.app.use("/rutas", importacionDeRutas);
    }
    async start(callback: () => void) {
        // metodo para conectar con DB
        await initModels();
        
        this.app.listen(this.port, callback);
    }
}
export default Server;