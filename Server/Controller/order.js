const DbService = require("../dbservice");
const fs = require("fs");
exports.orderController = async (req, res) => {
  const { userId, productName, cost, img } = req.body;
  if (!userId || !productName || !cost || !img) {
    return res.status(404).send("all field is required");
  } else {
    fs.writeFileSync(`orders/${productName}.txt`, img);
    const imgDir = `orders/${productName}.txt`;
    const resData = await DbService.addOrder({
      userId,
      productName,
      cost,
      imgDir,
    });
    if (resData) res.status(200).json("ok");
  }
};

exports.getOrder = async (req, res) => {
  const order = await DbService.getOrder();

  const orders = order.map((el) => {
    if (el.img) {
      return {
        ...el,
        img: fs.readFileSync(`${el.img}`, "utf8"),
      };
    } else return el;
  });
  if (orders) {
    res.status(200).json(orders);
  } else res.status(404).json("not found");
};
