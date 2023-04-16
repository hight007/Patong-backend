const express = require("express");
const app = express();
const cors = require("cors");
const { getToken, verifyToken } = require('./passport/jwtHandlers');

require('dotenv').config({ path: 'secret.env' });
const port = process.env.PORT;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use("/api/patong/authen/", require("./api/api_authen"));
app.use("/api/patong/users/", verifyToken ,require("./api/api_user"));
app.use("/api/patong/areas/", verifyToken, require("./api/api_area"));
app.use("/api/patong/products/", verifyToken, require("./api/api_product"));
app.use("/api/patong/stocks/", verifyToken, require("./api/api_stock"));
app.use("/api/patong/report/" , verifyToken, require("./api/api_report"));

app.listen(port, () => {
    console.log(`Backend Patong is running on port ${port}`);
});
 
// exports.patong = app 