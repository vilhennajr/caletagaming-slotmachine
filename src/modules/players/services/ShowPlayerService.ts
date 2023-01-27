import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Player from '../infra/typeorm/entities/Player';
import { IShowPlayer } from '../domain/models/IShowPlayer';
import { IPlayerRepository } from '../domain/repositories/IPlayersRepository';

@injectable()
class ShowPlayerService {

  constructor(

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository

  ) {}

  public async execute({ id }: IShowPlayer): Promise<Player> {
    const player = await this.playersRepository.findById(id);

    if (!player) {
      throw new AppError('Player not found.');
    }

    return player;
  }
}

export default ShowPlayerService;
