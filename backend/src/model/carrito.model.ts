import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Sequelize,
} from "sequelize";
import { DataBase } from "../config/db.connect";

export class CarritoModel extends Model<
    InferAttributes<CarritoModel>,
    InferCreationAttributes<CarritoModel>
> {
    declare id_carrito: CreationOptional<number>;
    declare id_usuario: number;
}

export async function initCarritoModel(): Promise<typeof CarritoModel> {
    const sequelize: Sequelize = await DataBase.getInstance();

    CarritoModel.init(
        {
            id_carrito: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "carritos",
            timestamps: false,
        }
    );

    return CarritoModel;
}
