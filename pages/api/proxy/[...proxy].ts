import { Environment } from '@lib/server/environment';
import { proxy } from '@server/proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    // removes the api prefix from url
    req.url = req.url?.replace(/^\/api\/proxy/, '');
    if (req.headers['pb-user-token'] === undefined) {
      req.headers['PB-API-TOKEN'] = Environment.API_KEY;
    }
    /**
     * if an error occurs in the proxy, we will reject the promise.
     * it is so important. if you don't reject the promise,
     * you're facing the stalled requests issue.
     */
    proxy.once('error', reject);

    proxy.web(req, res);
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false
  }
};
