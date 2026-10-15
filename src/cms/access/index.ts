import type { Access, FieldAccess } from 'payload';

type RoleUser = { id: number | string; role?: string | null } | null;

export const isSuperAdminUser = (user: RoleUser) => user?.role === 'superadmin';

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

export const isSuperAdmin: Access = ({ req: { user } }) =>
  isSuperAdminUser(user);

export const isSuperAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (isSuperAdminUser(user)) return true;
  return { id: { equals: user.id } };
};

// Logged-in users see drafts too, visitors only published posts.
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: 'published' } };
};

export const isSuperAdminFieldAccess: FieldAccess = ({ req: { user } }) =>
  isSuperAdminUser(user);
