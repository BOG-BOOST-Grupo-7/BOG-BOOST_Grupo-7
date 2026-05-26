import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

// Se crea la clase Product que hereda de Model
class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.UUID,
        // Genera automáticamente un UUID versión 4
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
         // Campo obligatorio
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },

    image_url: {
        type: DataTypes.STRING,
         // Campo opcional
        allowNull: true,
    },

    category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    
    references: {
        model: "categories",
        key: "id",
    },
    },

    status: {
        // Campo ENUM que solo acepta estos valores
        type: DataTypes.ENUM(
            "active",
            "inactive",
            "out_of_stock"
        ),
        defaultValue: "active",
    }

}, {
    sequelize,
    tableName: "Products",       // Fuerza a que la tabla en MySQL se llame "Roles"
    freezeTableName: true,
     // Activa createdAt y updatedAt automáticamente
    timestamps: true,
});

export default Product;