import type { Access } from "payload";

export const authenticated: Access = ({ req: { user } }) => Boolean(user);
export const publicRead: Access = () => true;
export const publishedRead: Access = ({ req: { user } }) =>
  user ? true : { published: { equals: true } };
