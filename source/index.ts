import { dialogApp } from "./handers";
import * as express from 'express';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.post('/', function (request, response) {
    dialogApp(request, response);
});

app.get('/alive', function (_, response) {
    response.send("I'm still alive");
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});