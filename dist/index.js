"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handers_1 = require("./handers");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.post('/', function (request, response) {
    handers_1.dialogApp(request, response);
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=index.js.map