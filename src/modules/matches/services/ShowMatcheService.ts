import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Matche from '../infra/typeorm/entities/Matche';
import { IShowMatche } from '../domain/models/IShowMatche';
import { IMatcheRepository } from '../domain/repositories/IMatchesRepository';

@injectable()
class ShowMatcheService {

  constructor(

    @inject('MatchesRepository')
    private matchesRepository: IMatcheRepository

  ) {}

  public async execute({ id }: IShowMatche): Promise<Matche> {
    const matche = await this.matchesRepository.findById(id);

    if (!matche) {
      throw new AppError('Matche not found.');
    }

    return matche;
  }
}

export default ShowMatcheService;
