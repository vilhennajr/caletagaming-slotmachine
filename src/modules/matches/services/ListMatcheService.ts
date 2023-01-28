import { inject, injectable } from 'tsyringe';
import { IMatcheRepository } from '../domain/repositories/IMatchesRepository';
import { IMatchePaginate } from '../domain/models/IMatchePaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListMatcheService {

  constructor(

    @inject('MatchesRepository')
    private matchesRepository: IMatcheRepository

  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IMatchePaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const matches = await this.matchesRepository.findAll({
      page,
      skip,
      take,
    });

    return matches;
  }
}

export default ListMatcheService;
