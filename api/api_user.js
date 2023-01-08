const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");


//Models
const user = require("./../database/models/user");

//api
router.post("/users", async (req, res) => {
    try {
        // console.log(req.body);
        req.body.password = bcrypt.hashSync(req.body.password, 9);
        const { username, password, user_level, createdBy } = req.body;

        const result = await user.create({ username, password, user_level, createdBy });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.get("/users", async (req, res) => {
    try {
        const result = await user.findAll({
            attributes: ["user_id", "username", "user_level", "createdBy", "lastLogOn", "createdAt", "updatedAt"],
            order: [["updatedAt", "desc"]]
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.patch("/users", async (req, res) => {
    try {
        const { user_id } = req.body
        const result = await user.update(req.body, { where: { user_id } });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.delete("/users", async (req, res) => {
    try {
        const { user_id } = req.body
        const result = await user.destroy({
            where: { user_id }
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

module.exports = router;