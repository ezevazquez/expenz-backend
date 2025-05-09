import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { Roles } from 'src/auth/roles.decorator';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly repo: Repository<Provider>,
  ) {}

  @Roles('admin')
  create(dto: CreateProviderDto) {
    const provider = this.repo.create(dto);
    return this.repo.save(provider);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  @Roles('admin')
  remove(id: number) {
    return this.repo.delete(id);
  }
}
