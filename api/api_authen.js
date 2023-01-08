const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const { getToken } = require('../passport/jwtHandlers');
const moment = require('moment');

//Models
const user = require("./../database/models/user");
 
//api
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await user.findOne({
            where: { username }, attributes: ["user_id", "password", "user_level"]
        });

        if (result) {
            if (bcrypt.compareSync(password, result.password)) {
                //Login pass
                await user.update(
                    { lastLogOn: moment().format('YYYY-MM-DD HH:mm:ss') },
                    { where: { user_id: result.user_id } })

                var token = await getToken({ username })
                res.json({
                    user_id: result.user_id,
                    user_level: result.user_level,
                    token,
                    api_result: OK,
                });
            } else {
                res.json({
                    error: "Incorrect password",
                    api_result: NOK,
                });
            }
        } else {
            res.json({
                error: "User not found",
                api_result: NOK,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})



module.exports = router;