import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeletePlayer } from '../domain/models/IDeletePlayer';
import { IPlayerRepository } from '../domain/repositories/IPlayersRepository';

@injectable()
class DeletePlayerService {

  constructor(

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository

  ) {}

  public async execute({ id }: IDeletePlayer): Promise<void> {
    const player = await this.playersRepository.findById(id);

    if (!player) {
      throw new AppError('Player not found.');
    }

    await this.playersRepository.remove(player);
  }
}

export default DeletePlayerService;
