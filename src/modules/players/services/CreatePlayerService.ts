import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPlayer } from '../domain/models/IPlayer';
import { ICreatePlayer } from '../domain/models/ICreatePlayer';
import { IPlayerRepository } from '../domain/repositories/IPlayersRepository';
import { ISettingRepository } from '../../settings/domain/repositories/ISettingsRepository';
import { hash } from 'bcryptjs';

@injectable()
class CreatePlayerService {

  constructor(

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository


  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreatePlayer): Promise<IPlayer> {
    const playerExists = await this.playersRepository.findByEmail(email);

    if (playerExists) {
      throw new AppError('There is already one player with this email');
    }

    const settings = await this.settingsRepository.findByKey('STARTING_MONEY');

    const hashedPassword = await hash(password, 8);

    const player = await this.playersRepository.create({
      name,
      email,
      password: hashedPassword,
      balance: settings ? settings.value : 0
    });

    return player;
  }
}

export default CreatePlayerService;
