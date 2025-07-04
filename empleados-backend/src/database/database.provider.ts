import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool } from 'mysql2/promise';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const DatabaseProvider: Provider = {
  provide: DATABASE_CONNECTION,
  useFactory: async (config: ConfigService) => {
    return createPool({
      host: config.get<string>('DB_HOST'),
      port: Number(config.get<string>('DB_PORT')),
      user: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  },
  inject: [ConfigService],
};
