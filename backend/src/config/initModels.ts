import { DataBase } from "../config/db.connect";
import { initUsuarioModel } from "../model/usuario.model";
// importá más modelos si tenés otros
// import { initOtroModel } from "./otro.model";

export async function initModels() {
  // obtener la instancia de Sequelize
  const sequelize = await DataBase.getInstance();

  // inicializar todos los modelos
  await initUsuarioModel();
  // await initOtroModel();

  // si tenés relaciones entre modelos, las declarás acá
  // Ej: UsuarioModel.hasMany(OtroModel);
  // OtroModel.belongsTo(UsuarioModel);

  await sequelize.sync({ alter: true });

  return sequelize;
}
