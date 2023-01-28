import { inject, injectable } from 'tsyringe';
import { IGameParamRepository } from '../domain/repositories/IGameParamsRepository';
import { IGameParamPaginate } from '../domain/models/IGameParamPaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListGameParamService {

  constructor(

    @inject('GameParamsRepository')
    private gameparamsRepository: IGameParamRepository

  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IGameParamPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const gameparams = await this.gameparamsRepository.findAll({
      page,
      skip,
      take,
    });

    return gameparams;
  }
}

export default ListGameParamService;
