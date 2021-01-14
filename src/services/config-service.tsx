import { config } from 'dotenv';
import * as path from 'path';

export const getEnvironmentVariables = () => {
  config({ path: path.join(__dirname, '../../.env') });
};
