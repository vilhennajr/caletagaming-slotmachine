import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePlayerService from '../../../services/CreatePlayerService';
import DeletePlayerService from '../../../services/DeletePlayerService';
import ListPlayerService from '../../../services/ListPlayerService';
import ShowPlayerService from '../../../services/ShowPlayerService';
import UpdatePlayerService from '../../../services/UpdatePlayerService';
import { classToClass } from 'class-transformer';

export default class PlayersController {
  public async index(request: Request, response: Response): Promise<Response> {

    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listPlayers = container.resolve(ListPlayerService);
    const players = await listPlayers.execute({ page, limit });

    return response.json(classToClass(players));
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showPlayer = container.resolve(ShowPlayerService);

    const player = await showPlayer.execute({ id });

    return response.json(classToClass(player));

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
    } = request.body;

    const createPlayer = container.resolve(CreatePlayerService);

    const player = await createPlayer.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(player));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name
    } = request.body;
    const { id } = request.params;

    const updatePlayer = container.resolve(UpdatePlayerService);

    const player = await updatePlayer.execute({
      id,
      name,
    });

    return response.json(classToClass(player));

  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePlayer = container.resolve(DeletePlayerService);

    await deletePlayer.execute({ id });

    return response.json([]);
  }
}
