import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = '.env.test';
    break;
  case 'production':
    path = '.env.production';
    break;
  default:
    path = '.env';
}
dotenv.config({ path: path });

export const APIKEY = process.env.REACT_APP_APIKEY;
export const GRAPHQL = process.env.REACT_APP_GRAPHQL;
export const STRIPETOKEN = process.env.REACT_APP_STRIPETOKEN;
export const STRIPECHECKOUT = process.env.REACT_APP_STRIPECHECKOUT;
export const BUYWITHETHADDRESS = process.env.BUY_WITH_ETH_ADDRESS;
