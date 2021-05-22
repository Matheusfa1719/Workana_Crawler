import express from 'express';

import keywordController from './Controllers/keywordController';
import projectsController from './Controllers/projectsController';

const routes = express();

routes.use('/keyword', keywordController);
routes.use('/projects', projectsController);

export default routes