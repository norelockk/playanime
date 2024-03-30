import { HydraEnvironmentData } from '@/types/hydra.interfaces';

const stage: HydraEnvironmentData = {
  APP_MODE: process.env.NODE_ENV,
  APP_SENTRY_DSN: 'https://8804ce3cd79bd6a3a8bf95c5bb47bc53@o4506810112868352.ingest.us.sentry.io/4506924708855808',
  APP_SENTRY_TARGETS: ['playani.me', new RegExp('/^https:\/\/playani\.me\/api/').toString()],
}

export default stage;