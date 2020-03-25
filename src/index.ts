import express from 'express';
import {viewsRouter} from './router/';
import * as bodyParser from 'body-parser';

const app: express.Application = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('views'));
app.set('view engine', 'pug');
app.use(viewsRouter);
app.listen(port, function() {
    console.log(`[app] \x1b[1m\x1b[32mServer listening on port:\x1b[0m \x1b[1m\x1b[35m${port}\x1b[0m`)
})