const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

//Models
const product = require("./../database/models/product");
const stock = require("./../database/models/stock");
const stockTracking = require("./../database/models/stockTracking");

//api
router.get("/stocks/findByStockName/?stockName=:stockName", async (req, res) => {
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
router.get("/stocksTracking/findByStockId/?stockId=?stockId", async (req, res) => {
    try {
        const { stockId } = req.params
        const result = await stockTracking.findAll({
            where: { stockId }
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})


router.post("/stocks", async (req, res) => {
    try {
        const result = await stock.create(req.body);

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.post("/stocksTracking", async (req, res) => {
    try {
        const result = await stockTracking.create(req.body);

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.patch("/stocks", async (req, res) => {
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