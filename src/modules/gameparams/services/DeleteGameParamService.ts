import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteGameParam } from '../domain/models/IDeleteGameParam';
import { IGameParamRepository } from '../domain/repositories/IGameParamsRepository';

@injectable()
class DeleteGameParamService {

  constructor(

    @inject('GameParamsRepository')
    private gameparamsRepository: IGameParamRepository

  ) {}

  public async execute({ id }: IDeleteGameParam): Promise<void> {
    const gameparam = await this.gameparamsRepository.findById(id);

    if (!gameparam) {
      throw new AppError('Game param not found.');
    }

    await this.gameparamsRepository.remove(gameparam);
  }
}

export default DeleteGameParamService;
