import { IMatchePaginate } from '@modules/matches/domain/models/IMatchePaginate';
import { ICreateMatche } from '@modules/matches/domain/models/ICreateMatche';
import { IMatcheRepository } from '@modules/matches/domain/repositories/IMatchesRepository';
import { Repository } from 'typeorm';
import Matche from '../entities/Matche';
import { SearchParams } from '../../../domain/repositories/IMatchesRepository';
import { dataSource } from '@shared/infra/typeorm';

class MatcheRepository implements IMatcheRepository {

  private ormRepository: Repository<Matche>

  constructor() {
    this.ormRepository = dataSource.getRepository(Matche);
  }

  public async create({ player_id, bet, win }: ICreateMatche): Promise<Matche> {

    const matche = this.ormRepository.create({ player_id, bet, win });

    await this.ormRepository.save(matche);

    return matche;

  }

  public async save(matche: Matche): Promise<Matche> {

    await this.ormRepository.save(matche);

    return matche;

  }

  public async findById(id: string): Promise<Matche | null> {
    const matche = this.ormRepository.findOne({
      where: { id },
      relations: ['player']
  });
    return matche;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IMatchePaginate> {
    const [
      matches,
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
      data: matches,
    };

    return result;
  }

}

export default MatcheRepository;
