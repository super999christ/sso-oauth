import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from 'next';

import { Environment } from '../environment';
import { SESSION_NAME } from './session';

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      email: string;
      isSuperAdmin: boolean;
      uuid: string;
      token: string;
      expiration: string;
      isCompleted: boolean;
      oltToken: string;
      pbUuid: string;
    };
  }
}

export const sessionOptions = {
  password: Environment.COOKIE_SECRET,
  cookieName: SESSION_NAME,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
    domain:
      process.env.NODE_ENV === 'production'
        ? process.env.COOKIE_DOMAIN
        : 'localhost'
  }
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
