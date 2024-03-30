import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config';

import reCAPTCHAv3 from 'payload-recaptcha-v3'

import Users from './collections/Users'
import Anime from './collections/Anime'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Anime],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    payloadCloud(),
    reCAPTCHAv3({
      secret: process.env.GOOGLE_RECAPTCHA_SECRET,
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  rateLimit: {
    max: 1000,
    window: 30 * 60 * 1000,
    trustProxy: true
  }
});