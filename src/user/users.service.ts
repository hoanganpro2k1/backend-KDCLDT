import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  createUser(user) {
    const conacac = this.userRepository.create(user);
    return this.userRepository.save(conacac);
  }
  async getAll() {
    return this.userRepository.find();
  }
  async deleteUser(id) {
    return this.userRepository.delete(id);
  }
}
