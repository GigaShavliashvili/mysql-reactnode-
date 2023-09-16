const { orderController, getOrder } = require("../Controller/order");

const orderRouter = require("express").Router();
orderRouter.post("",orderController).get("/all", getOrder)
module.exports = orderRouter

