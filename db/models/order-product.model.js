const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'order_products';

const OrderProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    }, 
    createdAt: { 
        allowNull: false, 
        type: DataTypes.DATE, 
        field: 'created_at', 
        defaultValue: Sequelize.NOW 
    }, 
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    product: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}
// se coloca el nombre del campo a crearse con field si se desea un nombre diferente al del esquema 
//(create_at => createdAt)

// definir una clase  partir de modelo
class OrderProduct extends Model {
    
    static associate(models) { 
        // establecer relaciones
        this.belongsTo(models.User, { 
            as: 'user',
            foreignKey: 'userId'
        });
        this.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'customerId'
        });
    }
    static config(sequelize) { 
        return { 
            sequelize, 
            tableName: ORDER_PRODUCT_TABLE, 
            modelName: 'OrderProduct', 
            timestamps: false 
        } 
    }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct }
