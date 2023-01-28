import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGameParamService from '../../../services/CreateGameParamService';
import DeleteGameParamService from '../../../services/DeleteGameParamService';
import ListGameParamService from '../../../services/ListGameParamService';
import ShowGameParamService from '../../../services/ShowGameParamService';
import UpdateGameParamService from '../../../services/UpdateGameParamService';
import { classToClass } from 'class-transformer';

export default class GameParamsController {
  public async index(request: Request, response: Response): Promise<Response> {

    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listGameParams = container.resolve(ListGameParamService);
    const gameparam = await listGameParams.execute({ page, limit });

    return response.json(classToClass(gameparam));
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showGameParam = container.resolve(ShowGameParamService);

    const gameparam = await showGameParam.execute({ id });

    return response.json(classToClass(gameparam));

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      symbol,
      value,
      weight,
    } = request.body;

    const createGameParam = container.resolve(CreateGameParamService);

    const gameparam = await createGameParam.execute({
      symbol,
      value,
      weight,
    });

    return response.json(classToClass(gameparam));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      symbol,
      value,
      weight,
    } = request.body;
    const { id } = request.params;

    const updateGameParam = container.resolve(UpdateGameParamService);

    const gameparam = await updateGameParam.execute({
      id,
      symbol,
      value,
      weight,
    });

    return response.json(classToClass(gameparam));

  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteGameParam = container.resolve(DeleteGameParamService);

    await deleteGameParam.execute({ id });

    return response.json([]);
  }
}
