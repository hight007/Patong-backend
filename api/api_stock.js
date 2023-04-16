const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

//Models
const product = require("./../database/models/product");
const stock = require("./../database/models/stock");
const stockTracking = require("./../database/models/stockTracking");
const area = require("./../database/models/area");

stock.belongsTo(area, {
    foreignKey: "area_id",
    targetKey: "area_id",
});
area.hasMany(stock, {
    foreignKey: "area_id",
    targetKey: "area_id",
});

//api
router.get("/findByStockName/stockName=:stockName", async (req, res) => {
    try {
        const { stockName } = req.params

        const result = await stock.findOne({
            where: { stockName }
        });


        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/findByProductId/productId=:productId", async (req, res) => {
    try {
        const { productId } = req.params
        const result = await stock.findAll({
            where: { productId, status: { [Op.in]: ['recieved', 'moved'], } },
            include: [area],
            orderBy: [['UpdatedAt' , 'asc']]
        });
        const totalQty = await stock.sum('quantity', { where: { productId, status: { [Op.in]: ['recieved', 'moved'] } } })

        res.json({ result, api_result: OK, totalQty })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/StocksTracking/findByStockId", async (req, res) => {
    try {
        const { stockId } = req.body
        const result = await stockTracking.findAll({
            where: { stockId }
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.post("/Stock", async (req, res) => {
    try {
        const result = await stock.create(req.body);

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.post("/StocksTracking", async (req, res) => {
    try {
        const result = await stockTracking.create(req.body);

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.patch("/Stock", async (req, res) => {
    try {
        const { stockId } = req.body
        const result = await stock.update(req.body, { where: { stockId } });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})



module.exports = router;