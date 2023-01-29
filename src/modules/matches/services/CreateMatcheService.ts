import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IMatche } from '../domain/models/IMatche';
import { ICreateMatche } from '../domain/models/ICreateMatche';
import { IMatcheRepository } from '../domain/repositories/IMatchesRepository';
import { IPlayerRepository } from '@modules/players/domain/repositories/IPlayersRepository';
import { ISettingRepository } from '@modules/settings/domain/repositories/ISettingsRepository';
import { IGameParamRepository } from '@modules/gameparams/domain/repositories/IGameParamsRepository';

const createDistribution = (weights: any[], size: number) => {
  const distribution = [];
  const sum = weights.reduce((a: any, b: any) => a + b);
  const quant = size / sum;
  for (let i = 0; i < weights.length; ++i) {
      const limit = quant * weights[i];
      for (let j = 0; j < limit; ++j) {
          distribution.push(i);
      }
  }
  return distribution;
};

const randomIndex = (distribution: string | any[]) => {
  const index = Math.floor(distribution.length * Math.random());  // random index
  return distribution[index];
};

const randomItem = (array: string[], distribution: number[]) => {
  const index = randomIndex(distribution);
  return array[index];
};

@injectable()
class CreateMatcheService {

  constructor(

    @inject('MatchesRepository')
    private matchesRepository: IMatcheRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository,

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository,

    @inject('GameParamsRepository')
    private gameparamsRepository: IGameParamRepository

  ) {}

  public async execute({
    player_id,
    bet,
    win,
    lose,
  }: ICreateMatche): Promise<IMatche> {

    //GET DEFAULT INVESTMENT AMOUNT PER MATCH
    const settings = await this.settingsRepository.findByKey('DEFAULT_INVESTMENT');

    //VERIFY IF THE PLAYER HAS BALANCE TO PLAY THE MATCH
    const isBlance = await this.playersRepository.findById(player_id);

    if (Number(isBlance?.balance) <= Number(settings ? settings.value : 0)) {
      throw new AppError('Player without enough balance.');
    }

    //GET GAME PARAMETERS
    const gameparams = await this.gameparamsRepository.find();

    //PLAY-RUN SCRIPT RANDOMLY WITH PROBABILITY
    const mapGameParamsSymbol = gameparams.map(function(item, indice){
      return item.symbol
    });

    const mapGameParamsWeight = gameparams.map(function(item, indice){
      return Number(item.weight)
    });

    const distribution = createDistribution(mapGameParamsWeight, 3);

    var resulfinal: string[] = [];

    for (let i = 0; i < 3; ++i) {
      resulfinal.push(randomItem(mapGameParamsSymbol, distribution))
    }

    const isMatche = resulfinal.filter((e, i, a) => a.indexOf(e) !== i)
    var  match = Number(isMatche.length) === 2 ? true : false

    console.log('result', {
      ramdon: [{
        columnOne: resulfinal[0],
        columnTwo: resulfinal[1],
        columnThree: resulfinal[2]
      }],
      isMatche: match,
      amount: match ? gameparams.find(sku => sku.symbol === resulfinal[0])?.value : 0
    })

    //CREATE MATCHE

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
