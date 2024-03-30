import { EnvironmentStage } from '../../typings/interfaces';

const development: EnvironmentStage = {
  SENTRY_DSN: 'https://8804ce3cd79bd6a3a8bf95c5bb47bc53@o4506810112868352.ingest.us.sentry.io/4506924708855808',
  STORAGE_NAME: 'playanime_dev',
  SENTRY_TRACING: ['localhost'],
};

export default development;