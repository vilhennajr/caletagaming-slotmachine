import { Router } from 'express';
import PlayersController from '../controllers/PlayersController';
import { celebrate, Joi, Segments } from 'celebrate';

const playersRouter = Router();
const playersController = new PlayersController();
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

playersRouter.get('/', isAuthenticated, playersController.index);

playersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  playersController.show,
);

playersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  playersController.create,
);

playersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  playersController.update,
);

playersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  playersController.delete,
);

export default playersRouter;
