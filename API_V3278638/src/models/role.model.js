import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Role extends Model {}

Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    sequelize,
    tableName: "Roles",       // Fuerza a que la tabla en MySQL se llame "Roles"
    freezeTableName: true
});

export default Role;