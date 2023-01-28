import { Router } from 'express';
import SettingsController from '../controllers/SettingsController';
import { celebrate, Joi, Segments } from 'celebrate';

const settingsRouter = Router();
const settingsController = new SettingsController();
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

settingsRouter.get('/', isAuthenticated, settingsController.index);

settingsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  settingsController.show,
);

settingsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      key: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  settingsController.create,
);

settingsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      key: Joi.string().required(),
      value: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  settingsController.update,
);

settingsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  settingsController.delete,
);

export default settingsRouter;
