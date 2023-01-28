import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IMatche } from '../domain/models/IMatche';
import { ICreateMatche } from '../domain/models/ICreateMatche';
import { IMatcheRepository } from '../domain/repositories/IMatchesRepository';
import { hash } from 'bcryptjs';

@injectable()
class CreateSettingService {

  constructor(

    @inject('MatchesRepository')
    private matchesRepository: IMatcheRepository

  ) {}

  public async execute({
    player_id,
    bet,
    win,
    lose,
  }: ICreateMatche): Promise<IMatche> {

    const matche = await this.matchesRepository.create({
      player_id,
      bet,
      win,
      lose,
    });

    return matche;
  }
}

export default CreateSettingService;
