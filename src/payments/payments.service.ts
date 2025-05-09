import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Charge } from '../charges/charge.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Charge)
    private readonly chargeRepo: Repository<Charge>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const charge = await this.chargeRepo.findOneBy({ id: dto.chargeId });
    if (!charge) throw new NotFoundException('Charge not found');

    if (charge.status === 'pagado') {
      throw new BadRequestException('Charge already paid');
    }

    const payment = this.paymentRepo.create({
      amount: dto.amount,
      date: new Date(dto.date),
      method: dto.method,
      reference: dto.reference,
      charge,
    });

    await this.paymentRepo.save(payment);

    charge.status = 'pagado';
    charge.paidAt = new Date(dto.date);
    await this.chargeRepo.save(charge);

    return payment;
  }

  findAll() {
    return this.paymentRepo.find({ relations: ['charge'] });
  }
}
