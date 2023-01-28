import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMatcheService from '../../../services/CreateMatcheService';
import ListMatcheService from '../../../services/ListMatcheService';
import ShowMatcheService from '../../../services/ShowMatcheService';
import { classToClass } from 'class-transformer';

export default class MatchesController {
  public async index(request: Request, response: Response): Promise<Response> {

    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listMatches = container.resolve(ListMatcheService);
    const matches = await listMatches.execute({ page, limit });

    return response.json(classToClass(matches));
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showMatche = container.resolve(ShowMatcheService);

    const matche = await showMatche.execute({ id });

    return response.json(classToClass(matche));

  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      player_id,
      bet,
      win,
      lose,
    } = request.body;

    const createMatche = container.resolve(CreateMatcheService);

    const matche = await createMatche.execute({
      player_id,
      bet,
      win,
      lose,
    });

    return response.json(classToClass(matche));
  }
}
