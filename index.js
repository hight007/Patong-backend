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
app.use("/api/patong/user/", verifyToken ,require("./api/api_user"));

app.listen(port, () => {
    console.log(`Backend Patong is running on port ${port}`);
});

// exports.patong = app 