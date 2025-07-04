import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@ApiTags('empleados')
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly svc: EmpleadosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear empleado' })
  create(@Body() dto: CreateEmpleadoDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar empleados' })
  findAll() {
    return this.svc.findAll();
  }

  @Put()
  @ApiOperation({ summary: 'Actualizar empleado' })
  update(@Body() dto: UpdateEmpleadoDto) {
    return this.svc.update(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar empleado' })
  remove(@Param('id') id: string) {
    return this.svc.remove(+id);
  }
}
