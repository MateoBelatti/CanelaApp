import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";
import { DataBase } from "../config/db.connect";
import bcrypt from 'bcrypt';

/**
 * Clase del modelo
 */
export class UsuarioModel extends Model<
  InferAttributes<UsuarioModel>,
  InferCreationAttributes<UsuarioModel>
> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare email: string;
  declare passwordHash: string;
  declare rol:  CreationOptional<"ADMIN" | "VENDEDOR" | "USER">;
  declare direccion: string | null;
  declare telefono: string | null;
}

/**
 * Función para inicializar el modelo
 * Debe ser llamada después de obtener la instancia de Sequelize
 */
export async function initUsuarioModel(): Promise<typeof UsuarioModel> {
  const sequelize: Sequelize = await DataBase.getInstance();

  UsuarioModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.ENUM("ADMIN", "VENDEDOR", "USER"),
        allowNull: true,
        defaultValue: "USER",
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "usuarios",
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
            if (user.passwordHash) {
                const salt = await bcrypt.genSalt(10);
                user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
            }
        },
        
        beforeUpdate: async (user) => {
            if (user.changed("passwordHash")) { // 🔹 solo si cambió la contraseña
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
            }
            }
        }
    }
  );

  return UsuarioModel;
}
