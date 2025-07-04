import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EmpleadosController } from './empleados/empleados.controller';
import { EmpleadosService } from './empleados/empleados.service';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
})
export class AppModule {}
