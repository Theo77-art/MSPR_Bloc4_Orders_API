const { v4: uuidv4 } = require('uuid');
const getAllOrders = async (request,  h) => {
    try {
        return orders = await request.mongo.db.collection('orders').find().toArray();
    } catch (err) {
        console.error(err);
        return h.response('Failed to fetch orders').code(500);
    }
}

const getOrderById = async (request, h) => {

    const orderId = request.params.orderId;
    try {
        return order = await request.mongo.db.collection('orders').findOne({_id: orderId});
    } catch (err) {
        console.error(err);
        return h.response('Failed to fetch orders').code(500);
    }
}

const getOrderByCustomerId = async (request, h) => {
    const customerId = request.params.customerId;
    try {
        return order = await request.mongo.db.collection('orders').find({customer_id: customerId}).toArray();
    } catch (err) {
        console.error(err);
        return h.response('Failed to fetch orders').code(500);
    }
}

const deleteOrderById = async (request, h) => {

    const orderId = request.params.orderId;
    try {
        return order = await request.mongo.db.collection('orders').deleteOne({_id: orderId});
    } catch (err) {
        console.error(err);
        return h.response('Failed to fetch orders').code(500);
    }
}

const deleteOrderByCustomerId = async (request, h) => {
    const customerId = request.params.customerId;
    try {
        return order = await request.mongo.db.collection('orders').deleteMany({customer_id: customerId});
        return { message: `Deleted ${result.deletedCount} orders` };
    } catch (err) {
        console.error(err);
        return h.response('Failed to fetch orders').code(500);
    }
}

const addOrder = async (request, h) => {
    try {

        const { customer_id, items, order_date, status } = request.payload;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return h.response('Items are required and should be a non-empty array').code(400);
        }
        const newOrder = {
            _id: uuidv4(),
            customer_id,
            items,
            order_date: new Date(order_date),
            status
        };

        const result = await request.mongo.db.collection('orders').insertOne(newOrder);
        return result.ops[0];
    } catch (err) {
        console.error(err);
        return h.response('Failed to add order').code(500);
    }
}

const addItemToOrderById = async (request, h) => {
    try {
        const item = request.payload;

        // Validation de l'item
        if (!item || !item.product_id || !item.quantity || !item.price) {
            return h.response('Item is required and should have product_id, quantity, and price').code(400);
        }

        const result = await request.mongo.db.collection('orders').updateOne(
            { _id: request.params.id },
            { $push: { items: item } }
        );

        if (result.matchedCount === 0) {
            return h.response('Order not found').code(404);
        }

        return { message: 'Item added to order successfully' };
    } catch (err) {
        console.error(err);
        return h.response('Failed to add item to order').code(500);
    }
};

const removeItemFromOrderById = async (request, h) => {
    try {
        const { product_id } = request.payload;

        // Validation du product_id
        if (!product_id) {
            return h.response('Product ID is required').code(400);
        }

        const result = await request.mongo.db.collection('orders').updateOne(
            { _id: request.params.id },
            { $pull: { items: { product_id } } }
        );

        if (result.matchedCount === 0) {
            return h.response('Order not found').code(404);
        }

        return { message: 'Item removed from order successfully' };
    } catch (err) {
        console.error(err);
        return h.response('Failed to remove item from order').code(500);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
    deleteOrderById,
    deleteOrderByCustomerId,
    addOrder,
    addItemToOrderById,
    removeItemFromOrderById
}