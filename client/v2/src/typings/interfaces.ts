import { Method } from 'axios';
import { NavigationGuardNext, RouteRecordRaw } from 'vue-router';
import { LogLevel } from './enums';

export interface EnvironmentStage {
  SENTRY_DSN: string;
  STORAGE_NAME: string;
  SENTRY_TRACING: string[];
}

export interface CustomStorageData {
  clientLanguage: string | null;
  // clientAccessToken: string | null;
  clientPlayerMuted: boolean;
  clientPlayerVolume: number;
  clientPrivacyAccept: boolean;
}

export interface RouterMiddleware {
  [key: string]: (to: RouteRecordRaw, from: RouteRecordRaw, next: NavigationGuardNext) => void;
}

export interface RequestOptions {
  method: Method;
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface AuthorizationApiLoginData {
  email: string;
  password: string;
}

export interface AuthorizationApiRegisterData {
  email: string;
  password: string;
  displayName: string;
}

export interface LoggerOptions {
  logLevel?: LogLevel;
}

export interface Timeout extends NodeJS.Timeout { }