import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Sequelize,
} from "sequelize";
import { DataBase } from "../config/db.connect";

export class DetalleCarritoModel extends Model<
    InferAttributes<DetalleCarritoModel>,
    InferCreationAttributes<DetalleCarritoModel>
> {
    declare id_detalle_carrito: CreationOptional<number>;
    declare id_carrito: number;
    declare id_producto: number;
    declare cantidad: number;
}

export async function initDetalleCarritoModel(): Promise<typeof DetalleCarritoModel> {
    const sequelize: Sequelize = await DataBase.getInstance();

    DetalleCarritoModel.init(
        {
            id_detalle_carrito: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_carrito: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_producto: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "detalle_carrito",
            timestamps: false,
        }
    );

    return DetalleCarritoModel;
}
