import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpleadoDto {
  @ApiProperty() empleado: string;
  @ApiProperty() identidad: string;
  @ApiProperty() puesto: string;
}
