import { DataBase } from "../config/db.connect";
import { initUsuarioModel, UsuarioModel } from "../model/usuario.model";
import { CategoriaModel, initCategoriaModel } from "../model/categoria.model";
import { CompraModel, initCompraModel } from "../model/compra.model";
import { initProductoModel, ProductoModel } from "../model/producto.model";
import { CarritoModel, initCarritoModel } from "../model/carrito.model";
import { DetalleCarritoModel, initDetalleCarritoModel } from "../model/detalleCarrito.model";
import { DetalleCompraModel, initDetalleCompraModel } from "../model/detalleCompra.model";

export async function initModels() {
    const sequelize = await DataBase.getInstance();

    /* ========== INIT MODELS ========== */

    await initUsuarioModel();
    await initCategoriaModel();
    await initProductoModel();
    await initCompraModel();
    await initCarritoModel();
    await initDetalleCarritoModel();
    await initDetalleCompraModel();

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

    UsuarioModel.hasMany(CompraModel, {
        foreignKey: "id_usuario",
        as: "compras",
    });

    CompraModel.belongsTo(UsuarioModel, {
        foreignKey: "id_usuario",
        as: "usuario",
    });

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

    CompraModel.hasMany(DetalleCompraModel, {
        foreignKey: "id_compra",
        as: "detalles",
    });

    DetalleCompraModel.belongsTo(CompraModel, {
        foreignKey: "id_compra",
        as: "compra",
    });

    /* ========== PRODUCTO - DETALLES ========== */

    ProductoModel.hasMany(DetalleCarritoModel, {
        foreignKey: "id_producto",
        as: "en_carritos",
    });

    ProductoModel.hasMany(DetalleCompraModel, {
        foreignKey: "id_producto",
        as: "en_compras",
    });

    DetalleCarritoModel.belongsTo(ProductoModel, {
        foreignKey: "id_producto",
        as: "producto",
    });

    DetalleCompraModel.belongsTo(ProductoModel, {
        foreignKey: "id_producto",
        as: "producto",
    });

    /* ========== SYNC ========== */

    await sequelize.sync({ alter: true });

    return sequelize;
}
