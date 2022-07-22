import { ConnectionConfig } from 'tedious';
export interface SeedingProps {
  seedSql: string;
  connectionConfig: ConnectionConfig;
}

export default SeedingProps;
