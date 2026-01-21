import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();
const dbPassword: string | null = process.env.DB_PASSWORD || null;
const dbUser: string | null = process.env.DB_USER || null

export class DataBase {

    private static instance: Sequelize | null = null;

    private constructor() {}

    private static async connectDB() : Promise<Sequelize>{
            if (!dbPassword || !dbUser) {
                throw new Error("Error en Usuario o Conraseña de DB");
            }
            const sequelize = new Sequelize('canela_artesanias', dbUser, dbPassword, {
                host: 'localhost', // o tu host
                dialect: 'mysql', // 'mysql', 'sqlite', 'mssql', etc. [3]
            });

            await sequelize.authenticate();
            return sequelize;
    }

    public static async getInstance() : Promise<Sequelize>{
        if (!this.instance) {
            this.instance = await DataBase.connectDB();
        }
        console.log("Conectado a la base de datos");
        return this.instance;
    }
}



