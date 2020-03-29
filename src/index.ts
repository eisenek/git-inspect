import express from 'express';
import * as bodyParser from 'body-parser';
import { viewsRouter, apiRouter } from './router';

const app: express.Application = express();
const port = process.env.PORT || 8080;


app.use('/assets', express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.set('view engine', 'pug');
app.use(viewsRouter);
app.use(apiRouter);
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});
app.listen(port, () => {
  console.log(`[app] \x1b[1m\x1b[32mServer listening on port:\x1b[0m \x1b[1m\x1b[35m${port}\x1b[0m`);
});
