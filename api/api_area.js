const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

//Models
const area = require("./../database/models/area");

//api
router.post("/area", async (req, res) => {
    try {
        const result = await area.create(req.body);

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.get("/area", async (req, res) => {
    try {
        const result = await area.findAll({
            order: [["updatedAt", "desc"]]
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.get("/areaOne/area_id=:area_id", async (req, res) => {
    try {
        const { area_id } = req.params
        const result = await area.findOne({ where: { area_id } });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.get("/areaPrint/area_id=:area_id", async (req, res) => {
    try {
        const { area_id } = req.params;
        const list_area_id = JSON.parse(area_id);
        const result = await area.findAll({
            where: {
                area_id: { [Op.in]: list_area_id },
            }
        })
        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.patch("/area", async (req, res) => {
    try {
        const { area_id } = req.body
        const result = await area.update(req.body, { where: { area_id } });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.delete("/area", async (req, res) => {
    try {
        const { area_id } = req.body
        const result = await area.destroy({
            where: { area_id }
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})



module.exports = router;