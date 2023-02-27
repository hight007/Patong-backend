const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const formidable = require('formidable-serverless');
const Jimp = require('jimp');
const moment = require("moment");
const fs = require('fs-extra')

//Models
const product = require("./../database/models/product");

//api
router.post("/product", async (req, res) => {
    try {
        const result = await product.create(req.body);

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.get("/product", async (req, res) => {
    try {
        const result = await product.findAll({
            attributes: ['productId', 'productName', 'productType', 'spec', 'detail', 'description', 'alertQuantity', 'isActive', 'default_total_quantity', 'createdBy' , 'updatedBy' , 'createdAt' , 'updatedAt' ],
            order: [["updatedAt", "desc"]]
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/productOne/productId=:productId", async (req, res) => {
    try {
        const { productId } = req.params
        const result = await product.findOne({ where: { productId } });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/productPrint/productId=:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await product.findOne({
            where: {
                productId,
            }
        })
        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.get("/sugressionProductType", async (req, res) => {
    try {
        const result = await product.findAll({
            attributes: ['productType'],
            group: "productType",
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

//update
router.patch("/product", async (req, res) => {
    try {
        const { productId } = req.body
        const result = await product.update(req.body, { where: { productId } });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})
router.patch("/image/", async (req, res) => {
    try {
        console.log('================================ image image image =================================================');
        const form = new formidable.IncomingForm();
        await form.parse(req, async (error, fields, files) => {
            if (!error) {
                const { productId } = fields;
                const data = {
                    sample_image: await fs.readFileSync(files.image.path),
                };

                await product.update(data, { where: { productId } });
                fs.unlinkSync(files.image.path);
                res.json({
                    api_result: OK,
                }); 
            }

        })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

// router.delete("/product", async (req, res) => {
//     try {
//         const { productId } = req.body
//         const result = await product.destroy({
//             where: { productId }
//         });

//         res.json({ result, api_result: OK })
//     } catch (error) {
//         console.log(error);
//         res.json({ error, api_result: NOK })
//     }
// })



module.exports = router;