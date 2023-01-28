import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSettingService from '../../../services/CreateSettingService';
import DeleteSettingService from '../../../services/DeleteSettingService';
import ListSettingService from '../../../services/ListSettingService';
import ShowSettingService from '../../../services/ShowSettingService';
import UpdateSettingService from '../../../services/UpdateSettingService';
import { classToClass } from 'class-transformer';

export default class SettingsController {
  public async index(request: Request, response: Response): Promise<Response> {

    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listSettings = container.resolve(ListSettingService);
    const settings = await listSettings.execute({ page, limit });

    return response.json(classToClass(settings));
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showSetting = container.resolve(ShowSettingService);

    const setting = await showSetting.execute({ id });

    return response.json(classToClass(setting));

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      key,
      value,
    } = request.body;

    const createSetting = container.resolve(CreateSettingService);

    const setting = await createSetting.execute({
      name,
      key,
      value,
    });

    return response.json(classToClass(setting));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      key,
      value,
    } = request.body;
    const { id } = request.params;

    const updateSetting = container.resolve(UpdateSettingService);

    const setting = await updateSetting.execute({
      id,
      name,
      key,
      value,
    });

    return response.json(classToClass(setting));

  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSetting = container.resolve(DeleteSettingService);

    await deleteSetting.execute({ id });

    return response.json([]);
  }
}
