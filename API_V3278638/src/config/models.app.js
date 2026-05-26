import sequelize from "../config/connect.db.js";
import UserStatus from "../models/userStatus.model.js";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

// Convertimos la función en async para poder usar await en el sync()
export const modelApp = async function initModels(select) {
    if (select) {
        // 1. Relación UserStatus -> User (Corregido el espacio en blanco de "userStatus_fk")
        UserStatus.hasMany(User, {
            foreignKey: { name: "userStatus_fk", field: "userStatus_fk", allowNull: true }
        });
        User.belongsTo(UserStatus, {
            foreignKey: { name: "userStatus_fk", field: "userStatus_fk", allowNull: true },
            constraints: true,
        });

        Role.hasMany(User, {
            foreignKey: { name: "role_fk", field: "role_fk", allowNull: false }
        });
        User.belongsTo(Role, {
            foreignKey: { name: "role_fk", field: "role_fk", allowNull: false },
            constraints: true
        });

        // 3. Sincronización correcta de la Base de Datos
        try {
            await sequelize.sync();
            console.log("¡Base de datos sincronizada exitosamente con sus relaciones!");
        } catch (error) {
            console.error("Error al sincronizar la base de datos:", error);
        }
    }
};