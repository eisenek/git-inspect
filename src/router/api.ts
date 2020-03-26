import * as express from 'express';
import listOfUserRepos from '../controllers/git';

const apiRouter: express.Router = express.Router();

apiRouter.route('/api/repos/list').get(listOfUserRepos);

export default apiRouter;
