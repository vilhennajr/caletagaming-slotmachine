import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import { celebrate, Joi, Segments } from 'celebrate';

const matchesRouter = Router();
const matchesController = new MatchesController();
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

matchesRouter.get('/', isAuthenticated, matchesController.index);

matchesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  matchesController.show,
);

matchesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      player_id: Joi.string().uuid().required(),
      bet: Joi.number().required(),
      win: Joi.number().required(),
      lose: Joi.number().required(),
    },
  }),
  matchesController.create,
);

export default matchesRouter;
