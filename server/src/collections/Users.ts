import { ROLES } from '../settings';

import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    lockTime: 5 * 60 * 1000,
    tokenExpiration: 14 * 24 * 60 * 60,
    maxLoginAttempts: 5
  },
  hooks: {
    afterRead: [
      ({ doc, req }) => {
        return doc;
      },
    ]
  },
  admin: {
    useAsTitle: 'username',
  },
  access: {
    read: () => true,
    update: ({ req }) => req.user,
  },
  fields: [
    { name: 'username', type: 'text', label: 'Username', unique: true, required: true },
    {
      name: 'globalRole',
      type: 'select',
      label: 'Role',
      access: {
        create: ({ req }) => req.user.globalRole === 'admin',
        update: ({ req }) => req.user.globalRole === 'admin',
      },
      options: ROLES,
      defaultValue: 'user'
    },
  ],
  // custom: {
  //   recaptcha: [
  //     { name: 'create', action: 'submit' }
  //   ]
  // }
}

export default Users;
