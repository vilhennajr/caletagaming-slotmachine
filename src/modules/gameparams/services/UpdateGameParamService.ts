import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateGameParam } from '../domain/models/IUpdateGameParam';
import GameParam from '../infra/typeorm/entities/GameParam';
import { IGameParamRepository } from '../domain/repositories/IGameParamsRepository';

@injectable()
class UpdateGameParamService {

  constructor(

    @inject('GameParamsRepository')
    private gameparamsRepository: IGameParamRepository

  ) {}

  public async execute({
    id,
    symbol,
    value,
    weight,
  }: IUpdateGameParam): Promise<GameParam> {
    const gameparam = await this.gameparamsRepository.findById(id);

    if (!gameparam) {
      throw new AppError('Game param not found.');
    }

    gameparam.symbol = symbol;
    gameparam.value = value;
    gameparam.weight = weight;

    await this.gameparamsRepository.save(gameparam);

    return gameparam;
  }
}

export default UpdateGameParamService;
