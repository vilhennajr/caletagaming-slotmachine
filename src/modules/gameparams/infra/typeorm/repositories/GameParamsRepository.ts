import { IGameParamPaginate } from '@modules/gameparams/domain/models/IGameParamPaginate';
import { ICreateGameParam } from '@modules/gameparams/domain/models/ICreateGameParam';
import { IGameParamRepository } from '@modules/gameparams/domain/repositories/IGameParamsRepository';
import { Repository } from 'typeorm';
import GameParam from '../entities/GameParam';
import { SearchParams } from '../../../domain/repositories/IGameParamsRepository';
import { dataSource } from '@shared/infra/typeorm';

class GameParamRepository implements IGameParamRepository {

  private ormRepository: Repository<GameParam>

  constructor() {
    this.ormRepository = dataSource.getRepository(GameParam);
  }

  public async create({ symbol, value, weight }: ICreateGameParam): Promise<GameParam> {

    const gameparam = this.ormRepository.create({ symbol, value, weight });

    await this.ormRepository.save(gameparam);

    return gameparam;

  }

  public async save(gameparam: GameParam): Promise<GameParam> {

    await this.ormRepository.save(gameparam);

    return gameparam;

  }

  public async findBySymbol(symbol: string): Promise<GameParam | null> {
    const gameparam = this.ormRepository.findOneBy({ symbol });
    return gameparam;
  }

  public async findById(id: string): Promise<GameParam | null> {
    const gameparam = this.ormRepository.findOneBy({ id });
    return gameparam;
  }

  public async remove(gameparam: GameParam): Promise<void> {
    await this.ormRepository.remove(gameparam);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IGameParamPaginate> {
    const [
      gameparams,
      count,
    ] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: gameparams,
    };

    return result;
  }

}

export default GameParamRepository;
