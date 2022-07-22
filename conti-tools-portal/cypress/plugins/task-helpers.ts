import SeedingProps from 'cypress/support/SeedingProps';
import { Connection, Request } from 'tedious';

export const execSql = (seedingProps: SeedingProps) => {
  const connection = new Connection(seedingProps.connectionConfig);
  connection.on('connect', (err) => {
    if (err) {
      return undefined;
    } else {
      const request = new Request(seedingProps.seedSql, (error) => {
        if (error) {
          return undefined;
        }
      });
      connection.execSql(request);
    }
  });
  connection.connect();
  return null;
};
