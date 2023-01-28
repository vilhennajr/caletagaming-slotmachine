import { Router } from 'express';
import GameParamsController from '../controllers/GameParamsController';
import { celebrate, Joi, Segments } from 'celebrate';

const gameparamsRouter = Router();
const gameparamsController = new GameParamsController();
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

gameparamsRouter.get('/', isAuthenticated, gameparamsController.index);

gameparamsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  gameparamsController.show,
);

gameparamsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      symbol: Joi.string().required(),
      value: Joi.number().required(),
      weight: Joi.number().required(),
    },
  }),
  gameparamsController.create,
);

gameparamsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      symbol: Joi.string().required(),
      value: Joi.number().required(),
      weight: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  gameparamsController.update,
);

gameparamsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  gameparamsController.delete,
);

export default gameparamsRouter;
