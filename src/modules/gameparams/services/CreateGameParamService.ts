import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IGameParam } from '../domain/models/IGameParam';
import { ICreateGameParam } from '../domain/models/ICreateGameParam';
import { IGameParamRepository } from '../domain/repositories/IGameParamsRepository';

@injectable()
class CreateGameParamService {

  constructor(

    @inject('GameParamsRepository')
    private gameparamsRepository: IGameParamRepository

  ) {}

  public async execute({
    symbol,
    value,
    weight,
  }: ICreateGameParam): Promise<IGameParam> {
    const gameparamExists = await this.gameparamsRepository.findBySymbol(symbol);

    if (gameparamExists) {
      throw new AppError('There is already one game param with this symbol');
    }

    const gameparam = await this.gameparamsRepository.create({
      symbol,
      value,
      weight,
    });

    return gameparam;
  }
}

export default CreateGameParamService;
