const { OK, NOK } = require("./../constants");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

//Models
const product = require("./../database/models/product");
const stock = require("./../database/models/stock");
const stockTracking = require("./../database/models/stockTracking");
const area = require("./../database/models/area");
const sequelize = require("sequelize");

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

router.get("/stockByProduct/productType=:productType", async (req, res) => {
    try {
        const { productType } = req.params

        let where = {}
        if (productType != 0) {
            where = { ...where, productType }
        }

        const result = await stock.findAll({
            attributes: [
                "tbProduct.productName",
                [sequelize.fn('sum', sequelize.col('total_quantity')), 'remain_quantity'],
            ],
            include: [{ model: product, where }],
            group: ['tbProduct.productName', "tbProduct.productId"],
            where: { status: { [Op.in]: ['recieved', 'moved'] }, },
        });

        res.json({ result, api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

router.get("/productAndStockQty/productType=:productType", async (req, res) => {
    try {
        const { productType } = req.params

        let where = ''
        if (productType != 0) {
            where = ` and p."productType" = '${productType}'`
        }

        const result = await product.sequelize.query(`SELECT 
p."productId"
,p."productName"
,p."productType"
,p."spec"
,p."detail"
,p."description"
,p."alertQuantity"
,p."isOrdered"
,p."default_total_quantity"
,COALESCE(s."total_quantity" , '0') as total_quantity
FROM public."tbProducts" p 
left join (
	select "productId" 
	,sum(total_quantity) as total_quantity
	from public."tbStocks"
	group by "productId"
) s on s."productId" = p."productId"
where p."isActive" = true ${where}`, {
            raw: true,
        }
        );

        res.json({ result: result[0], api_result: OK })
    } catch (error) {
        console.log(error);
        res.json({ error, api_result: NOK })
    }
})

module.exports = router;
