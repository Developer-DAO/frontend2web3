import { IronSessionOptions } from 'iron-session';

declare module 'iron-session' {
  interface IronSessionData<T> {
    nonce: string;
    siwe?: string;
  }
}
