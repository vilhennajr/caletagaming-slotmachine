import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IPlayer } from '../domain/models/IPlayer';
import { IPlayerRepository } from '../domain/repositories/IPlayersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  player: IPlayer;
  token: string;
}

@injectable()
class CreateSessionsService {

  constructor(

    @inject('PlayersRepository')
    private playersRepository: IPlayerRepository

  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const player = await this.playersRepository.findByEmail(email);

    if (!player) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, player.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(player.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      player,
      token,
    };
  }
}

export default CreateSessionsService;
