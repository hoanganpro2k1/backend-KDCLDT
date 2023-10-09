import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  createUser(user) {
    const conacac = this.userRepository.create(user);
    return this.userRepository.save(conacac);
  }

  async registerUser(user: LoginDTO) {
    const checkUsername = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (checkUsername) {
      return `Đã tồn tại username ${user.username}`;
    } else {
      const hash = await bcrypt.hash(user.password, 6);
      return this.userRepository.save({ ...user, password: hash });
    }
  }
  async login(login: LoginDTO) {
    const checkUsername = await this.userRepository.findOne({
      where: { username: login.username },
    });
    if (!checkUsername) {
      throw new HttpException(
        `Không tồn tại username ${login.username}`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const passwordHash = await bcrypt.compare(
        login.password,
        checkUsername.password,
      );
      if (passwordHash) {
        const payload = { data: { ...checkUsername } };
        return {
          id: checkUsername.id,
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new HttpException(
          'Sai mật khẩu, vui lòng nhập lại',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  async getAll() {
    return this.userRepository.find();
  }
  async deleteUser(id) {
    return this.userRepository.delete(id);
  }
}
