import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Sequelize,
    ForeignKey,
} from "sequelize";
import { DataBase } from "../config/db.connect";
import { CategoriaModel } from "./categoria.model";

export class ProductoModel extends Model<
    InferAttributes<ProductoModel>,
    InferCreationAttributes<ProductoModel>
> {
    declare id_producto: CreationOptional<number>;
    declare imagen_producto: string | null;
    declare nombre: string;
    declare descripcion: string;
    declare precio: number;
    declare stock: number;
    declare activo: boolean;
    declare id_categoria: ForeignKey<CategoriaModel["id_categoria"]>;
}

export async function initProductoModel(): Promise<typeof ProductoModel> {
    const sequelize: Sequelize = await DataBase.getInstance();

    ProductoModel.init({
        id_producto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
            imagen_producto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categorias",
                key: "id_categoria",
                },
        },
    },
    {
        sequelize,
        tableName: "productos",
        timestamps: false,
    }
    );

    return ProductoModel;
}
