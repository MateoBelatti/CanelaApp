import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Sequelize,
} from "sequelize";
import { DataBase } from "../config/db.connect";

export class CategoriaModel extends Model<
    InferAttributes<CategoriaModel>,
    InferCreationAttributes<CategoriaModel>
> {
    declare id_categoria: CreationOptional<number>;
    declare nombre: string;
}

export async function initCategoriaModel(): Promise<typeof CategoriaModel> {
    const sequelize: Sequelize = await DataBase.getInstance();

    CategoriaModel.init({
        id_categoria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "categorias",
        timestamps: false,
    });

    return CategoriaModel;
}
