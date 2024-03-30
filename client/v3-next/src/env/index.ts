import { EnvironmentStage } from '../types/interfaces';

import production from './stages/production';
import development from './stages/development';

import api_prod from './stages/urls/prod';
import api_dev from './stages/urls/dev';

const url: string = import.meta.env.PROD ? api_prod : api_dev;

export default abstract class Environment {
  // data
  public static get DATA(): EnvironmentStage {
    const stage: EnvironmentStage = Object.freeze(import.meta.env.PROD ? production : development);

    return stage;
  }

  public static get API_URL(): string {
    const protocol: string = window.location.protocol.includes('https') ? 'https://' : 'http://';

    return protocol + url;
  }

  // bools
  public static get PRODUCTION(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  public static get DEVELOPMENT(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}

if (Environment.PRODUCTION && !Environment.API_URL.includes(url))
  throw new ReferenceError('invalid API production url');
