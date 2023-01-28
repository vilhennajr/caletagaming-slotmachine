import { Router } from 'express';
import playersRouter from '@modules/players/infra/http/routes/players.routes';
import sessionsRouter from '@modules/players/infra/http/routes/sessions.routes';
import settingsRouter from '@modules/settings/infra/http/routes/settings.routes';
import gameparamsRouter from '@modules/gameparams/infra/http/routes/gameparams.routes';

const routes = Router();

routes.use('/players', playersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/settings', settingsRouter);
routes.use('/gameparams', gameparamsRouter);

export default routes;
