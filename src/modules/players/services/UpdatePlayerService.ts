import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdatePlayer } from '../domain/models/IUpdatePlayer';
import Player from '../infra/typeorm/entities/Player';
import { IPlayerRepository } from '../domain/repositories/IPlayersRepository';

@injectable()
class UpdatePlayerService {

  constructor(

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository

  ) {}

  public async execute({
    id,
    name,
  }: IUpdatePlayer): Promise<Player> {
    const player = await this.playersRepository.findById(id);

    if (!player) {
      throw new AppError('Player not found.');
    }

    player.name = name;

    await this.playersRepository.save(player);

    return player;
  }
}

export default UpdatePlayerService;
