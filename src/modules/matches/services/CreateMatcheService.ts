import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IMatche } from '../domain/models/IMatche';
import { ICreateMatche } from '../domain/models/ICreateMatche';
import { IMatcheRepository } from '../domain/repositories/IMatchesRepository';
import { IPlayerRepository } from '@modules/players/domain/repositories/IPlayersRepository';
import { ISettingRepository } from '@modules/settings/domain/repositories/ISettingsRepository';

@injectable()
class CreateMatcheService {

  constructor(

    @inject('MatchesRepository')
    private matchesRepository: IMatcheRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository

  ) {}

  public async execute({
    player_id,
    bet,
    win,
    lose,
  }: ICreateMatche): Promise<IMatche> {

    //VERIFY DEFAULT INVESTMENT AMOUNT PER MATCH
    const settings = await this.settingsRepository.findByKey('DEFAULT_INVESTMENT');

    //VERIFY IF THE PLAYER HAS BALANCE TO PLAY THE MATCH
    const isBlance = await this.playersRepository.findById(player_id);

    if (Number(isBlance?.balance) <= Number(settings ? settings.value : 0)) {
      throw new AppError('Player without enough balance.');
    }

    //PLAY

    const matche = await this.matchesRepository.create({
      player_id,
      bet,
      win,
      lose,
    });

    return matche;
  }
}

export default CreateMatcheService;
