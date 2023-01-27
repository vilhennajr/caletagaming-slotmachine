import { Router } from 'express';
import playersRouter from '@modules/players/infra/http/routes/players.routes';
import sessionsRouter from '@modules/players/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/players', playersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
