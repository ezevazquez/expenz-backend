import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BuildingsModule } from './buildings/buildings.module';
import { UnitsModule } from './units/units.module';
import { ProvidersModule } from './providers/providers.module';
import { ExpensesModule } from './expenses/expenses.module';
import { SettlementsModule } from './settlements/settlements.module';
import { ChargesModule } from './charges/charges.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME ?? 'default_user',
      password: process.env.DB_PASSWORD || undefined,
      database: process.env.DB_NAME ?? 'default_db',
      autoLoadEntities: true,
      synchronize: true, // ¡IMPORTANTE! solo en desarrollo
    }),
    AuthModule,
    UsersModule,
    BuildingsModule,
    UnitsModule,
    ProvidersModule,
    ExpensesModule,
    SettlementsModule,
    ChargesModule,
    PaymentsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
