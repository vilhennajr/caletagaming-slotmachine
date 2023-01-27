import { inject, injectable } from 'tsyringe';
import { IPlayerRepository } from '../domain/repositories/IPlayersRepository';
import { IPlayerPaginate } from '../domain/models/IPlayerPaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListPlayerService {

  constructor(

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository

  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPlayerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const players = await this.playersRepository.findAll({
      page,
      skip,
      take,
    });

    return players;
  }
}

export default ListPlayerService;
