import { IPlayerPaginate } from '@modules/players/domain/models/IPlayerPaginate';
import { ICreatePlayer } from '@modules/players/domain/models/ICreatePlayer';
import { IPlayerRepository } from '@modules/players/domain/repositories/IPlayersRepository';
import { Repository } from 'typeorm';
import Player from '../entities/Player';
import { SearchParams } from '../../../domain/repositories/IPlayersRepository';
import { dataSource } from '@shared/infra/typeorm';

class PlayerRepository implements IPlayerRepository {

  private ormRepository: Repository<Player>

  constructor() {
    this.ormRepository = dataSource.getRepository(Player);
  }

  public async create({ name, email, password }: ICreatePlayer): Promise<Player> {

    const player = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(player);

    return player;

  }

  public async save(player: Player): Promise<Player> {

    await this.ormRepository.save(player);

    return player;

  }

  public async findByEmail(email: string): Promise<Player | null> {
    const player = this.ormRepository.findOneBy({ email });
    return player;
  }

  public async findById(id: string): Promise<Player | null> {
    const player = this.ormRepository.findOneBy({ id });
    return player;
  }

  public async remove(player: Player): Promise<void> {
    await this.ormRepository.remove(player);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPlayerPaginate> {
    const [
      players,
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
      data: players,
    };

    return result;
  }

}

export default PlayerRepository;
