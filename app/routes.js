const controller = require("./controllers");

const routes = [
    {
        method: 'GET',
        path: '/orders',
        handler: controller.getAllOrders
    },
    {
        method: 'GET',
        path: '/orders/{orderId}',
        handler: controller.getOrderById
    },
    {
        method: 'GET',
        path: '/orders/customer/{customerId}',
        handler: controller.getOrderByCustomerId
    },
    {
        method: 'POST',
        path: '/orders',
        handler: controller.addOrder
    },
    {
        method: 'DELETE',
        path: '/orders/{orderId}',
        handler: controller.deleteOrderById
    },
    {
        method: 'DELETE',
        path: '/orders/customer/{customerId}',
        handler: controller.deleteOrderByCustomerId
    },
    {
        method: 'DELETE',
        path: '/orders/{id}/items',
        handler: controller.removeItemFromOrderById
    },
    {
        method: 'PUT',
        path: '/orders/{id}/items',
        handler: controller.addItemToOrderById
    }



];

module.exports = routes;