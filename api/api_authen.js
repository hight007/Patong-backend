const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const { getToken, verifyToken } = require('../passport/jwtHandlers');
const moment = require('moment');
const Jimp = require('jimp');

require('dotenv').config({ path: 'secret.env' });

//Models
const user = require("./../database/models/user");
const product = require("./../database/models/product");

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
                    secret_key: process.env.CRYPTO_SECRET
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

router.get("/crypto", verifyToken, async (req, res) => {
    try {
        res.json({ key: process.env.CRYPTO_SECRET, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.get("/image/productId=:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(productId);
        const result = await product.findOne({ where: { productId }, attributes: ['sample_image'] });
        if (result.sample_image) {
            Jimp.read(result.sample_image, async (err, image) => {
                image.scale(1).quality(100)
                const img = await image.getBufferAsync(Jimp.MIME_JPEG)

                res.type('image/jpeg');
                res.end(img, 'binary');
            });
        } else {
            res.json({ api_result: NOK })
        }
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})


module.exports = router;