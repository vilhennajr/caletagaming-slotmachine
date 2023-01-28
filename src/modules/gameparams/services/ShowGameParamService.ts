import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import GameParam from '../infra/typeorm/entities/GameParam';
import { IShowGameParam } from '../domain/models/IShowGameParam';
import { IGameParamRepository } from '../domain/repositories/IGameParamsRepository';

@injectable()
class ShowGameParamService {

  constructor(

    @inject('GameParamsRepository')
    private gameparamsRepository: IGameParamRepository

  ) {}

  public async execute({ id }: IShowGameParam): Promise<GameParam> {
    const gameparam = await this.gameparamsRepository.findById(id);

    if (!gameparam) {
      throw new AppError('Game param not found.');
    }

    return gameparam;
  }
}

export default ShowGameParamService;
