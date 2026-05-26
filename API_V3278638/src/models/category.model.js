import sequelize from "../config/connect.db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    parent_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "categories",
            key: "id",
        },
    },
    
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },

}, {
    sequelize,
    tableName: "categories",
    timestamps: true, // Timestamps en sequelize agrega las columnas created_at y update_at y para agregarlo manual cambio de true a false 
    createdAt: "created_at",
    updatedAt: "updated_at",
});

// Relación autoreferencial: una categoría pertenece a una categoría padre
Category.belongsTo(Category, {
    as: "parent",
    foreignKey: "parent_id",
});

// Relación autoreferencial: una categoría tiene muchas subcategorías
Category.hasMany(Category, {
    as: "subcategories",
    foreignKey: "parent_id",
});

export default Category;