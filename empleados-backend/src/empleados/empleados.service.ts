import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Logger } from '../logs/logger';

@Injectable()
export class EmpleadosService {
  constructor(@Inject(DATABASE_CONNECTION) private pool: Pool) {}

  async create(dto: CreateEmpleadoDto) {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();
      const [res] = await conn.execute<ResultSetHeader>(
        `INSERT INTO empleados (empleado, identidad, puesto) VALUES (?, ?, ?)`,
        [dto.empleado, dto.identidad, dto.puesto],
      );
      await conn.commit();
      const id = res.insertId;
      Logger.info(`Empleado creado ${id}`);
      return { id, ...dto, creation_date: new Date() };
    } catch (err: unknown) {
      await conn.rollback();
      const error = err as Error;
      Logger.error(`Error creando empleado: ${error.message}`);
      throw error;
    } finally {
      conn.release();
    }
  }

  async findAll() {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      `SELECT id, empleado, identidad, puesto, creation_date
       FROM empleados
       ORDER BY creation_date DESC`,
    );
    return rows;
  }

  async update(dto: UpdateEmpleadoDto) {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute(
        `UPDATE empleados
         SET empleado = ?, identidad = ?, puesto = ?
         WHERE id = ?`,
        [dto.empleado, dto.identidad, dto.puesto, dto.id],
      );
      await conn.commit();
      Logger.info(`Empleado actualizado ${dto.id}`);
      return dto;
    } catch (err: unknown) {
      await conn.rollback();
      const error = err as Error;
      Logger.error(`Error actualizando empleado ${dto.id}: ${error.message}`);
      throw error;
    } finally {
      conn.release();
    }
  }

  async remove(id: number) {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute(`DELETE FROM empleados WHERE id = ?`, [id]);
      await conn.commit();
      Logger.info(`Empleado eliminado ${id}`);
    } catch (err: unknown) {
      await conn.rollback();
      const error = err as Error;
      Logger.error(`Error eliminando empleado ${id}: ${error.message}`);
      throw error;
    } finally {
      conn.release();
    }
  }
}
