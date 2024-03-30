import { LogLevel } from './hydra.enums';

export interface LoggerOptions {
  logLevel?: LogLevel;
}

export interface HydraEnvironmentData { 
  APP_MODE: 'production' | 'development'; // as vue presents atm xd.
  APP_SENTRY_DSN: string;
  APP_SENTRY_TARGETS: string[];
}