import { DataBase } from "../config/db.connect";
import { initUsuarioModel, UsuarioModel } from "../model/usuario.model";
import { CategoriaModel, initCategoriaModel } from "../model/categoria.model";
import { initProductoModel, ProductoModel } from "../model/producto.model";
import { CarritoModel, initCarritoModel } from "../model/carrito.model";
import { DetalleCarritoModel, initDetalleCarritoModel } from "../model/detalleCarrito.model";

export async function initModels() {
    const sequelize = await DataBase.getInstance();

    /* ========== INIT MODELS ========== */

    await initUsuarioModel();
    await initCategoriaModel();
    await initProductoModel();
    await initCarritoModel();
    await initDetalleCarritoModel();

    /* ========== CATEGORIA - PRODUCTO ========== */

    CategoriaModel.hasMany(ProductoModel, {
        foreignKey: "id_categoria",
        as: "productos",
    });

    ProductoModel.belongsTo(CategoriaModel, {
        foreignKey: "id_categoria",
        as: "categoria",
    });

    /* ========== USUARIO - CARRITO ========== */

    UsuarioModel.hasOne(CarritoModel, {
        foreignKey: "id_usuario",
        as: "carrito",
    });

    CarritoModel.belongsTo(UsuarioModel, {
        foreignKey: "id_usuario",
        as: "usuario",
    });

    /* ========== USUARIO - COMPRA ========== */


    /* ========== CARRITO - DETALLE CARRITO ========== */

    CarritoModel.hasMany(DetalleCarritoModel, {
        foreignKey: "id_carrito",
        as: "items",
    });

    DetalleCarritoModel.belongsTo(CarritoModel, {
        foreignKey: "id_carrito",
        as: "carrito",
    });

    /* ========== COMPRA - DETALLE COMPRA ========== */

    /* ========== PRODUCTO - DETALLES ========== */

    ProductoModel.hasMany(DetalleCarritoModel, {
        foreignKey: "id_producto",
        as: "en_carritos",
    });

    DetalleCarritoModel.belongsTo(ProductoModel, {
        foreignKey: "id_producto",
        as: "producto",
    });

    /* ========== SYNC ========== */

    await sequelize.sync();

    return sequelize;
}
