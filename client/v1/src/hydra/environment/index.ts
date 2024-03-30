import ProductionStage from './stages/production';
import DevelopmentStage from './stages/development';
import { HydraEnvironmentData } from '@/types/hydra.interfaces';

export abstract class HydraEnvironment {
  public static get production(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  public static get development(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}

const Environment: HydraEnvironmentData = process.env.NODE_ENV === 'production' ? ProductionStage : DevelopmentStage;

export default Environment;