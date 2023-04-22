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

stock.belongsTo(product, {
    foreignKey: "productId",
    targetKey: "productId",
});
product.hasMany(stock, {
    foreignKey: "productId",
    targetKey: "productId",
});

stockTracking.belongsTo(area, {
    foreignKey: "area_id",
    targetKey: "area_id",
});
area.hasMany(stockTracking, {
    foreignKey: "area_id",
    targetKey: "area_id",
});

stockTracking.belongsTo(stock, {
    foreignKey: "stockId",
    targetKey: "stockId",
});
stock.hasMany(stockTracking, {
    foreignKey: "stockId",
    targetKey: "stockId",
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
            include: [area , stock],
            order: [['updatedAt' , 'ASC']]
        });
        const totalQty = await stock.sum('quantity', { where: { productId, status: { [Op.in]: ['recieved', 'moved'] } } })

        res.json({ result, api_result: OK, totalQty })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/StocksTracking/stockId=:stockId", async (req, res) => {
    try {
        const { stockId } = req.params
        const result = await stockTracking.findAll({
            include: [{ model: area, attributes : ['area']}, { model: stock, attributes: ['stockName']}],
            where: { stockId }
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/findAllByProductId/productId=:productId", async (req, res) => {
    try {
        const { productId } = req.params
        const result = await stock.findAll({
            where: { productId},
            include: [area],
            order: [['updatedAt', 'DESC']]
        });
        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/reprint/stockId=:stockId" , async (req, res) => {
    try {
        const { stockId } = req.params
        const listStockId = JSON.parse(stockId)

        const result = await stock.findAll({
            include: [{ model: product, attributes: ['spec', 'productName'], }],
            where: { stockId: { [Op.in]: listStockId }, },
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