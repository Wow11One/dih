import type { CollectionConfig } from 'payload';
import {
  isSuperAdmin,
  isSuperAdminFieldAccess,
  isSuperAdminOrSelf,
  isSuperAdminUser,
} from '../access';

// Two levels: the superadmin (developer) manages users, admins manage content
// and can only edit their own account (name, email, password — not the role).
export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { uk: 'Користувач', en: 'User' },
    plural: { uk: 'Користувачі', en: 'Users' },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
    hidden: ({ user }) => !isSuperAdminUser(user),
  },
  auth: true,
  access: {
    create: isSuperAdmin,
    read: isSuperAdminOrSelf,
    update: isSuperAdminOrSelf,
    delete: isSuperAdmin,
  },
  hooks: {
    beforeChange: [
      // The very first account (created from the /admin welcome screen)
      // becomes the superadmin.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data;
        const { totalDocs } = await req.payload.count({
          collection: 'users',
          req,
        });
        if (totalDocs === 0) data.role = 'superadmin';
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { uk: "Ім'я", en: 'Name' },
    },
    {
      name: 'role',
      type: 'select',
      label: { uk: 'Роль', en: 'Role' },
      required: true,
      defaultValue: 'admin',
      saveToJWT: true,
      options: [
        { label: { uk: 'Суперадмін', en: 'Superadmin' }, value: 'superadmin' },
        { label: { uk: 'Адмін', en: 'Admin' }, value: 'admin' },
      ],
      access: {
        create: isSuperAdminFieldAccess,
        update: isSuperAdminFieldAccess,
      },
      admin: { position: 'sidebar' },
    },
  ],
};
