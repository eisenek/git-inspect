import * as express from 'express'
import getMainPage from '../controllers/main';
const viewsRouter: express.Router = express.Router()

viewsRouter
  .route('/')
  .get(getMainPage)

export default viewsRouter;